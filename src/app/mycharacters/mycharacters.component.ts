import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { apiref } from '../ref/str/apiref';
import { datacenters } from '../ref/str/datacenters';
import { Subscription } from 'rxjs';
import { MycharactersService } from './mycharacters.service';

export interface AddCharDialogData {
  owner: string;  
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

  constructor(public dialog: MatDialog, private http: HttpClient, private apiurl: apiref) { }

  ngOnInit() {
    this.startTimer();
    this.getCharacterList();
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
          characters: this.characters
        }
      });

    dialogRef.afterClosed().subscribe(data => {});
  }

  getCharacterList() {
    this.isLoading = true;
    this.http.get<{ message: string, characters: any }>(this.apiurl.hostname() + "/api/characters/get/all/" + localStorage.username).subscribe((characterData) => {
      this.characters = characterData.characters;
      this.isLoading = false;
      this.hasFetchedCharacters = true;
    });
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
  charFName = "";
  charLName = "";
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
    private DCs: datacenters,
    private mcService: MycharactersService,
    @Inject(MAT_DIALOG_DATA) public data: AddCharDialogData) {    
      this.form = fb.group({
      owner: ""
    }); }

  ngOnInit(){
    this.firstFormGroup = this.fb.group({firstname: ['', Validators.required],
    lastname: ['', Validators.required],
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
      this.charFName = this.firstFormGroup.get("firstname").value;
      this.charLName = this.firstFormGroup.get("lastname").value;
      this.charServer = this.firstFormGroup.get("server").value;

      if(this.stringIsSafe(this.charFName + this.charLName + this.charServer))
      {
        this.http.get<{character: {ID: string, Avatar: string}}>(this.apiurl.hostname() + "/api/characters/get/" + this.charFName + "/" + this.charLName + "/" + this.charServer)
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
      firstname: this.charFName,
      lastname: this.charLName,
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
  }

  verifyToken() {
    this.isLoading = true;
    this.http.get<{Pass: boolean, msg: string}>(this.apiurl.hostname() + "/api/characters/verify/" + this.charID + "/" + this.verfToken)
      .subscribe((tokenData) => {
        this.mcService.updateVerfMsg(tokenData.Pass, tokenData.msg);
        if(tokenData.Pass)
        {
          this.isVerified = true;

          const data = {
            owner: localStorage.username,
            //token: localStorage.token,
            avatar: this.charAvatar,
            ID: this.charID,
            first: this.charFName,
            last: this.charLName,
            server: this.charServer,
            datacenter: this.DCs.getDatacenter(this.charServer)
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
    // TODO: Should return data about character to refresh screen of user
    this.dialogRef.close();
  }
}
