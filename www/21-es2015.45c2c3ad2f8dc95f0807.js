(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{nypb:function(e,t,n){"use strict";n.r(t),n.d(t,"LostPasswordModule",(function(){return f}));var o=n("ofXK"),r=n("3Pt+"),i=n("fXoL"),a=n("qfBg"),s=n("2g2N"),c=n("TEn/"),l=n("uX3w");function d(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275elementStart"](1,"p"),i["\u0275\u0275text"](2,"Preencha seu email para que possamos enviar um c\xf3digo de recupera\xe7\xe3o."),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](3,"ion-item"),i["\u0275\u0275elementStart"](4,"ion-label",4),i["\u0275\u0275text"](5,"E-mail"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](6,"ion-input",5),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](7,"ion-button",6),i["\u0275\u0275listener"]("click",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275nextContext"]().sendRecoveryCode()})),i["\u0275\u0275text"](8),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=i["\u0275\u0275nextContext"]();i["\u0275\u0275advance"](6),i["\u0275\u0275property"]("formControl",e.emailFormControl),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("disabled",e.emailFormControl.invalid||e.sendingEmail),i["\u0275\u0275advance"](1),i["\u0275\u0275textInterpolate1"](" ",e.sendingEmail?"Enviando email...":"Recuperar senha"," ")}}function m(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275elementStart"](1,"p"),i["\u0275\u0275text"](2,"Foi enviado para o seu e-mail um c\xf3digo de 4 d\xedgitos. Por favor, digite-os abaixo."),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](3,"div",7),i["\u0275\u0275elementStart"](4,"input",8,9),i["\u0275\u0275listener"]("focus",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](5).select()}))("keyup",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](7).focus()})),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](6,"input",8,10),i["\u0275\u0275listener"]("focus",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](7).select()}))("keyup",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](9).focus()})),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](8,"input",8,11),i["\u0275\u0275listener"]("focus",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](9).select()}))("keyup",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](11).focus()})),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](10,"input",8,12),i["\u0275\u0275listener"]("focus",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275reference"](11).select()}))("keyup",(function(){i["\u0275\u0275restoreView"](e);const t=i["\u0275\u0275reference"](11),n=i["\u0275\u0275reference"](5),o=i["\u0275\u0275reference"](7),r=i["\u0275\u0275reference"](9),a=i["\u0275\u0275nextContext"]();return t.focus(),a.validateCode(n,o,r,t)})),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementContainerEnd"]()}}function u(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275elementStart"](1,"p"),i["\u0275\u0275text"](2,"Digite uma nova senha para sua conta. Dica: coloque uma senha que voc\xea ir\xe1 lembrar com facilidade posteriormente."),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](3,"form",13),i["\u0275\u0275elementStart"](4,"ion-item"),i["\u0275\u0275elementStart"](5,"ion-label",4),i["\u0275\u0275text"](6,"Nova senha"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](7,"ion-input",14),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](8,"ion-item"),i["\u0275\u0275elementStart"](9,"ion-label",4),i["\u0275\u0275text"](10,"Confirme a nova senha"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](11,"ion-input",15),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](12,"ion-button",6),i["\u0275\u0275listener"]("click",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275nextContext"]().changePassword()})),i["\u0275\u0275text"](13),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementContainerEnd"]()}if(2&e){const e=i["\u0275\u0275nextContext"]();i["\u0275\u0275advance"](3),i["\u0275\u0275property"]("formGroup",e.passwordFormGroup),i["\u0275\u0275advance"](9),i["\u0275\u0275property"]("disabled",e.passwordFormGroup.invalid||e.passwordFormGroup.controls.password.value!=e.passwordFormGroup.controls.passwordConfirmation.value||e.changingPassword),i["\u0275\u0275advance"](1),i["\u0275\u0275textInterpolate1"](" ",e.changingPassword?"Atualizando senha...":"Confirmar nova senha"," ")}}let p=(()=>{class e{constructor(e,t,n){this._userService=e,this._toastService=t,this._navCtrl=n,this.step="email",this.sendingEmail=!1,this.changingPassword=!1,this.emailFormControl=new r.a("",[r.o.email,r.o.required]),this.passwordFormGroup=new r.d({password:new r.a("",[r.o.required,r.o.minLength(5)]),passwordConfirmation:new r.a("",[r.o.required,r.o.minLength(5)])})}ngOnInit(){}sendRecoveryCode(){this.sendingEmail=!0,this._userService.sendLostPasswordEmail(this.emailFormControl.value).subscribe(()=>{this.step="code",this.sendingEmail=!1},e=>{this._toastService.showHttpError(e),this.sendingEmail=!1})}validateCode(e,t,n,o){this._verificationCode=`${e.value}${t.value}${n.value}${o.value}`,this._userService.confirmLostPasswordEmail(this.emailFormControl.value,this._verificationCode).subscribe(()=>{this.step="password"},()=>{e.value="",t.value="",n.value="",o.value="",this._verificationCode="",e.focus(),this._toastService.show("C\xf3digo inv\xe1lido, verifique o c\xf3digo correto no seu email.")})}changePassword(){this.changingPassword=!0,this._userService.recoverPassword(this._verificationCode,this.passwordFormGroup.controls.password.value,this.emailFormControl.value).subscribe(()=>{this._toastService.show("Senha atualizada com sucesso, entre com sua nova senha \u{1f609}\u{1f680}"),this._navCtrl.navigateRoot("/login"),this.changingPassword=!1},e=>{this._toastService.showHttpError(e),this.changingPassword=!1})}}return e.\u0275fac=function(t){return new(t||e)(i["\u0275\u0275directiveInject"](a.a),i["\u0275\u0275directiveInject"](s.a),i["\u0275\u0275directiveInject"](c.M))},e.\u0275cmp=i["\u0275\u0275defineComponent"]({type:e,selectors:[["app-lost-password"]],decls:8,vars:5,consts:[["title","Esqueci minha senha",3,"showButtonBack"],[1,"content"],[3,"ngSwitch"],[4,"ngSwitchCase"],["position","stacked"],["type","email","autocomplete","undefined","color","light","required","",3,"formControl"],[3,"disabled","click"],[1,"digits"],["type","number",3,"focus","keyup"],["firstDigit",""],["secondDigit",""],["thirdDigit",""],["fourthDigit",""],[3,"formGroup"],["type","password","formControlName","password","minlength","5","color","light","required",""],["type","password","minlength","5","formControlName","passwordConfirmation","color","light","required",""]],template:function(e,t){1&e&&(i["\u0275\u0275element"](0,"base-toolbar",0),i["\u0275\u0275elementStart"](1,"div",1),i["\u0275\u0275elementStart"](2,"span"),i["\u0275\u0275text"](3,"Sem problemas!"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](4,"div",2),i["\u0275\u0275template"](5,d,9,3,"ng-container",3),i["\u0275\u0275template"](6,m,12,0,"ng-container",3),i["\u0275\u0275template"](7,u,14,3,"ng-container",3),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"]()),2&e&&(i["\u0275\u0275property"]("showButtonBack",!0),i["\u0275\u0275advance"](4),i["\u0275\u0275property"]("ngSwitch",t.step),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngSwitchCase","email"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngSwitchCase","code"),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngSwitchCase","password"))},directives:[l.a,o.l,o.m,c.p,c.q,c.o,c.Q,r.n,r.k,r.b,c.d,r.p,r.l,r.e,r.c,r.h],styles:["[_nghost-%COMP%]   ion-item[_ngcontent-%COMP%]{--background:var(--background-color)}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]{height:100%;overflow:hidden;width:var(--container-width);max-width:var(--container-max-width);margin:12px auto;padding:32px}[_nghost-%COMP%]   .content[_ngcontent-%COMP%], [_nghost-%COMP%]   .content[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:24px}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]     ion-input{color:#000}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px;font-weight:700}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   .digits[_ngcontent-%COMP%]{display:flex;gap:24px;justify-content:center}[_nghost-%COMP%]   .content[_ngcontent-%COMP%]   .digits[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{max-width:46px;min-height:52px;font-size:28px;text-align:center;margin:0;outline:none}"]}),e})();var h=n("tyNb"),g=n("PCNd");let f=(()=>{class e{}return e.\u0275mod=i["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=i["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.b,r.f,c.I,r.m,g.a,h.j.forChild([{path:"",component:p}])]]}),e})()}}]);