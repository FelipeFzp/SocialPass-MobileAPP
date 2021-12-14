function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{X5fl:function(e,n,t){"use strict";t.r(n),t.d(n,"CardCollectionsModule",(function(){return P}));var o=t("ofXK"),c=t("PCNd"),i=t("tyNb"),r=t("fXoL"),l=t("TEn/"),a=t("2g2N"),s=t("3LUQ"),d=t("8dox"),g=t("uX3w");function C(e,n){1&e&&r["\u0275\u0275element"](0,"ion-progress-bar",5)}function p(e,n){1&e&&(r["\u0275\u0275elementStart"](0,"span",6),r["\u0275\u0275text"](1,"N\xe3o encontramos nada por aqui. \ud83e\udd37\u200d\u2642\ufe0f"),r["\u0275\u0275elementEnd"]())}var u=function(e){return{disabled:e}};function m(e,n){if(1&e){var t=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",13),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](t);var e=n.$implicit;return r["\u0275\u0275nextContext"](2).goToCard(e.nickname)})),r["\u0275\u0275elementStart"](1,"ion-avatar",14),r["\u0275\u0275elementStart"](2,"img",15,16),r["\u0275\u0275listener"]("error",(function(){return r["\u0275\u0275restoreView"](t),r["\u0275\u0275reference"](3).src="../../../../../assets/images/default-avatar.png"})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"ion-label"),r["\u0275\u0275text"](5),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){var o=n.$implicit,c=r["\u0275\u0275nextContext"](2);r["\u0275\u0275property"]("ngClass",r["\u0275\u0275pureFunction1"](3,u,c.loading)),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("src",o.imageUrl,r["\u0275\u0275sanitizeUrl"]),r["\u0275\u0275advance"](3),r["\u0275\u0275textInterpolate"](o.name)}}function f(e,n){if(1&e){var t=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",7),r["\u0275\u0275elementStart"](1,"div",8),r["\u0275\u0275elementStart"](2,"div"),r["\u0275\u0275element"](3,"ion-icon",9),r["\u0275\u0275text"](4),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](5,"ion-icon",10),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](t);var e=n.$implicit;return r["\u0275\u0275nextContext"]().deleteCollection(e.id)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"div",11),r["\u0275\u0275template"](7,m,6,5,"div",12),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){var o=n.$implicit,c=r["\u0275\u0275nextContext"]();r["\u0275\u0275advance"](4),r["\u0275\u0275textInterpolate1"](" ",o.name," "),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngClass",r["\u0275\u0275pureFunction1"](3,u,c.loading)),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngForOf",o.cards)}}var _,v,h=((v=function(){function e(n,t,o,c){_classCallCheck(this,e),this._navCtrl=n,this._toastService=t,this._alertService=o,this._cardCollectionService=c}return _createClass(e,[{key:"ionViewDidEnter",value:function(){this.loadCollections()}},{key:"loadCollections",value:function(){var e=this;this.loading=!0,this._cardCollectionService.getCollectionsWithCards().subscribe((function(n){e.collections=n,e.loading=!1}),(function(n){e._toastService.showHttpError(n),e.loading=!1}))}},{key:"deleteCollection",value:function(e){var n=this;this._alertService.show({subHeader:"Tem certeza que deseja excluir essa cole\xe7\xe3o?",buttons:[{text:"N\xe3o",role:"cancel"},{text:"Sim",cssClass:"danger",handler:function(){n.loading=!0,n._cardCollectionService.deleteCollection(e).subscribe((function(){n.collections=n.collections.filter((function(n){return n.id!=e})),n._toastService.show("Cole\xe7\xe3o deletada com sucesso. \ud83d\udc40"),n.loading=!1}),(function(e){n._toastService.showHttpError(e),n.loading=!1}))}}]})}},{key:"goToCard",value:function(e){this._navCtrl.navigateForward("/home/card",{queryParams:{userName:e}})}}]),e}()).\u0275fac=function(e){return new(e||v)(r["\u0275\u0275directiveInject"](l.M),r["\u0275\u0275directiveInject"](a.a),r["\u0275\u0275directiveInject"](s.a),r["\u0275\u0275directiveInject"](d.a))},v.\u0275cmp=r["\u0275\u0275defineComponent"]({type:v,selectors:[["app-card-collections"]],decls:5,vars:4,consts:[["title","Cole\xe7\xf5es",3,"showButtonBack"],["type","indeterminate",4,"ngIf"],[1,"collection-containers"],["class","empty",4,"ngIf"],["class","collection",4,"ngFor","ngForOf"],["type","indeterminate"],[1,"empty"],[1,"collection"],[1,"header"],["name","bookmarks-outline"],["name","trash",1,"delete",3,"ngClass","click"],[1,"cards"],["class","card",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"card",3,"ngClass","click"],["slot","start"],[3,"src","error"],["profileImage",""]],template:function(e,n){1&e&&(r["\u0275\u0275element"](0,"base-toolbar",0),r["\u0275\u0275template"](1,C,1,0,"ion-progress-bar",1),r["\u0275\u0275elementStart"](2,"div",2),r["\u0275\u0275template"](3,p,2,0,"span",3),r["\u0275\u0275template"](4,f,8,5,"div",4),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275property"]("showButtonBack",!0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",n.loading),r["\u0275\u0275advance"](2),r["\u0275\u0275property"]("ngIf",!(null!=n.collections&&n.collections.length||n.loading)),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngForOf",n.collections))},directives:[g.a,o.j,o.i,l.u,l.n,o.h,l.c,l.q],styles:["[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]{padding:24px;flex:1;display:flex;flex-direction:column;gap:32px;align-items:center;overflow:auto}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .empty[_ngcontent-%COMP%]{width:100%;text-align:center}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]{max-width:var(--container-max-width);width:var(--container-width)}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .delete[_ngcontent-%COMP%]{font-size:22px;cursor:pointer;color:var(--ion-color-primary-shade)}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .delete.disabled[_ngcontent-%COMP%]{opacity:.6;pointer-events:none}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:20px}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,25%);row-gap:12px}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;max-width:90%;max-height:110px;overflow:hidden;border:none;background-color:var(--background-color)}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card.disabled[_ngcontent-%COMP%]{pointer-events:none}[_nghost-%COMP%]   .collection-containers[_ngcontent-%COMP%]   .collection[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-top:12px;font-size:12px}"]}),v),P=((_=function e(){_classCallCheck(this,e)}).\u0275mod=r["\u0275\u0275defineNgModule"]({type:_}),_.\u0275inj=r["\u0275\u0275defineInjector"]({factory:function(e){return new(e||_)},imports:[[o.b,c.a,i.j.forChild([{path:"",component:h}])]]}),_)}}]);