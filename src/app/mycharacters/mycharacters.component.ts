import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { apiref } from '../ref/str/apiref';
import { Subscription } from 'rxjs';
import { MycharactersService } from './mycharacters.service';

export interface AddCharDialogData {
  owner: string; 
  servers: any; 
}

@Component({
  selector: 'app-mycharacters',
  templateUrl: './mycharacters.component.html',
  styleUrls: ['./mycharacters.component.scss']
})
export class MycharactersComponent implements OnInit {

  isLoading: boolean = false;
  hasFetchedCharacters: boolean = false;
  timeLeft: number = 10;
  interval: any;
  characters = [];
  servers: any;
  hasFetchedServers: boolean = false;

  constructor(public dialog: MatDialog, private http: HttpClient, private apiurl: apiref) { }

  ngOnInit() {
    this.startTimer();
    this.getCharacterList();
    this.getServerList();
  }
  
  // Timer responsible for allowing the DOM to update if no response from server,
  // will provide button to retry request if timer >10s and loading is not complete
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
    },1000)
  }

  confirmAdd() {
    const dialogRef = this.dialog.open(MycharactersAddcharacterDialog,
      {
        autoFocus: false,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '100vh',
        data: {
          owner: "",
          characters: this.characters,
          servers: this.servers
        }
      });

    dialogRef.afterClosed().subscribe(data => {
      if(data.verified){
        this.http.patch<{message: string, characters: any[]}>(this.apiurl.hostname() + "/api/characters/refresh/", {id: data.id})
        .subscribe(() => {
          this.getCharacterList();
        });
      }
    });
  }

  getCharacterList() {
    this.isLoading = true;
    this.http.get<{ message: string, characters: any }>(this.apiurl.hostname() + "/api/characters/get/all/" + localStorage.username).subscribe((characterData) => {
      this.characters = characterData.characters;
      this.isLoading = false;
      this.hasFetchedCharacters = true;
    });
  }

  getServerList() {
    this.isLoading = true;
    this.http.get<{ message: string, servers: any }>(this.apiurl.hostname() + "/api/servers/").subscribe((serverData) => {
      this.servers = serverData.servers;
      this.isLoading = false;
      this.hasFetchedServers = true;
    })
  }

  retryFetchData() {
    this.timeLeft = 10;
    this.getCharacterList();
  }
}

@Component({
  selector: 'mycharacters-addcharacter-dialog',
  templateUrl: 'mycharacters-addcharacter-dialog.html',
  styleUrls: ['./mycharacters-addcharacter-dialog.scss']
})
export class MycharactersAddcharacterDialog implements OnInit {

  form: FormGroup;
  submitted = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  private verfMsgListenerSub: Subscription;

  charAvatar = "";
  charName = "";
  charServer = "";
  charID = "";
  lodestoneLink = "";
  verfToken = "";
  errorMsg = "";
  message = "";
  pass = false;
  
  isVerified = false;
  characterValid = false;
  isLoading = false;

  userCanFinish = false;

  get f() { return this.form.controls; }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MycharactersAddcharacterDialog>,
    private apiurl: apiref,
    private mcService: MycharactersService,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: AddCharDialogData) {    
      this.form = fb.group({
      owner: ""
    }); }

  ngOnInit(){
    this.firstFormGroup = this.fb.group({
    name: ['', Validators.required],
    server: ['', Validators.required]});
    this.secondFormGroup = this.fb.group({secondCtrl: ['', Validators.required]});

    this.verfMsgListenerSub = this.mcService.getVerfMsgListener().subscribe(result => {
      this.message = result.msg;
      this.pass = result.pass;
    })
  }

  ngOnDestroy() {
    this.verfMsgListenerSub.unsubscribe();
  }

  stringIsSafe(input: string) {
    var regex = RegExp("[a-zA-Z'-\s]*"); // Should only contain lower and upper alphabets, ', -, and spaces
    return regex.test(input);
  }

  canFinish() {
    this.userCanFinish = true;
  }

  resetForm() {
    this.userCanFinish = false;
    this.isVerified = false;
  }

  getChar() {
    if(this.firstFormGroup.valid)
    {
      this.isLoading = true;
      this.charName = this.firstFormGroup.get("name").value;
      this.charServer = this.firstFormGroup.get("server").value.name;

      if(this.stringIsSafe(this.charName + this.charServer))
      {
        this.http.get<{character: {ID: string, Avatar: string}}>(this.apiurl.hostname() + "/api/characters/get/server/" + this.charName + "/" + this.charServer)
        .subscribe((characterData) => {
          this.isLoading = false;

          if(characterData) {      
            this.charID = characterData.character.ID;
            this.charAvatar = characterData.character.Avatar;
            this.lodestoneLink = "https://na.finalfantasyxiv.com/lodestone/character/" + this.charID + "/";
            this.characterValid = true;
          }
        });
      }
    }
  }

  getToken() {
    this.isLoading = true;

    var data = {
      username: localStorage.getItem("username"),
      charName: this.charName,
      server: this.charServer
    };

    this.http.post<{token: string, expiresIn: string}>(this.apiurl.hostname() + "/api/characters/generate_token", data)
    .subscribe((tokenData) => {
      this.verfToken = tokenData.token,
      this.isLoading = false;
    });
  }

  copyToken(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    this.sb.open("Copied", "", {duration: 3000});
  }

  verifyToken() {
    this.isLoading = true;
    this.http.get<{Pass: boolean, msg: string}>(this.apiurl.hostname() + "/api/characters/verify/" + this.charID + "/" + this.verfToken)
      .subscribe((tokenData) => {
        this.mcService.updateVerfMsg(tokenData.Pass, tokenData.msg);
        if(tokenData.Pass)
        {
          this.isVerified = true;
          this.canFinish();

          const data = {
            owner: localStorage.username,
            avatar: this.charAvatar,
            ID: this.charID,
            name: this.charName,
            server: this.charServer
          }

          this.http.put<{response: any}>(this.apiurl.hostname() + "/api/characters/add", data)
            .subscribe((responseData) => {
              this.isLoading = false;
            })
        }
        else{
          this.isVerified = false;
          this.isLoading = false;
        }
      })
  }

  onCancel() {
    this.dialogRef.close({verified: false});
  }

  onFinish() {
    this.dialogRef.close({verified: true, id: this.charID});
  }
}
