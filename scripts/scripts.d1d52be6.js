"use strict";angular.module("trelloApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","signature","ngm.ngDrive"]).config(["$routeProvider",function(a){a.when("/lsKeys",{templateUrl:"views/lskeys.html",controller:"LskeysCtrl",controllerAs:"lsKeys"}).when("/gdrive",{templateUrl:"views/gdrive.html",controller:"GdriveCtrl",controllerAs:"gdrive"}).otherwise({redirectTo:"/lsKeys"})}]),angular.module("ngm.ngDrive").provider("OauthService",ngDrive.Config).config(["OauthServiceProvider",function(a){a.setScopes("https://www.googleapis.com/auth/drive.file"),a.setClientID(localStorage.getItem("client_id")),a.setTokenRefreshPolicy(ngDrive.TokenRefreshPolicy.ON_DEMAND),a.setPopupBlockedFunction(function(){console.error("popups blocked")}),a.setTestingRefreshToken(localStorage.getItem("refresh_token")),a.setTestingClientSecret(localStorage.getItem("client_secret"))}]),angular.module("trelloApp").controller("LskeysCtrl",["$scope","$rootScope",function(a,b){a.clientID=localStorage.getItem("client_id")||"",a.clientSecret=localStorage.getItem("client_secret")||"",a.refreshToken=localStorage.getItem("refresh_token")||"",a.gagnatorgKey=localStorage.getItem("gagnatorg_key")||"",a.toLocalStorage=function(){localStorage.setItem("client_id",a.clientID),localStorage.setItem("client_secret",a.clientSecret),localStorage.setItem("refresh_token",a.refreshToken),localStorage.setItem("gagnatorg_key",a.gagnatorgKey),alert("SUBMITTED , Please REFRESH the page")}}]),angular.module("trelloApp").controller("GdriveCtrl",["$scope","DriveService","$http","$filter",function(a,b,c,d){var e=localStorage.getItem("gagnatorg_key")||"5mtsorvmggv5icj54j1r26vpikaryfm2iqy6zo0r";a.enterKT=function(b){13===b.which&&a.fetchCustomer()},a.fetchCustomer=function(){var b={method:"GET",params:{redirect:""},url:"https://api.ja.is/skra/v1/kennitolur/"+a.kt,headers:{Authorization:e}};c(b).then(function(b){var c=b.data;console.log("we got KT ",c),"person"===c.type?(a.leigutaki=c.name,a.heimili=c.permanent_address.street.dative+" "+c.permanent_address.postal_code+c.permanent_address.town.dative,a.kennitala=Number(c.kennitala)):"business"===c.type&&(a.leigutaki=c.full_name,a.heimili=c.legal_address.street.dative+" "+c.legal_address.postal_code+c.legal_address.town.dative,a.kennitala=Number(c.kennitala),c.date_bankrupt&&alert(" ATH fyrirtæki er  gjaldþrota"))},function(a){alert(" Villan. Gagnatorg : ",a.statusText),console.warn(a.status)})},a.showContract=function(){a.contractVisible?a.contractVisible=!1:a.contractVisible=!0},a.makeFile=function(c){console.log("data",c),a.showUploading=!0,a.hideContent=!0;var e={info:{title:"Leigusamningur",author:"Tæki.is",subject:"Test",keywords:"TestDrive"},pageMargins:[50,100,50,50],content:["\n",{columns:[{width:"17%",text:"Leigutaki:",bold:!0,style:"taeki"},{width:"50%",text:a.leigutaki||"",style:"taeki"},{width:"14%",text:"Kt.:",bold:!0,style:"taeki"},{width:"19%",text:a.kennitala||"",style:"taeki"}]},"\n",{columns:[{width:"17%",text:"Heimili:",bold:!0,style:"taeki"},{width:"50%",text:a.heimili||"",style:"taeki"},{width:"14%",text:"Umb.:",bold:!0,style:"taeki"},{width:"19%",text:a.umb||"",style:"taeki"}]},"\n",{text:"LEIGUSKILMÁLAR",style:"header",fontSize:10,bold:!0,alignment:"center",margin:[0,20,0,7]},{fontSize:8,ol:["  Ofangreint tæki ásamt fylgihlutum hefur leigusali afhent leigutaka í fullkomnu lagi, sem leigutaki hefur kynnt sér.\nLeigutaki hefur einnig kynnt sér notkun og meðferð tækisins. ","Leigutaki skal sjá um allan rekstur tækisins á meðan hann hefur það á leigu, svo sem smurningu, smurolíu, eldsneyti, þrif o.fl. \n","Leigutaki er ábyrgur fyrir tjóni sem kann að verða á tækinu og fylgihlutum þess vegna ógætilegrar og/eða rangrar notkunar.\n","Leigutaki ber fulla ábyrgð ef tæki tapast eða því er stolið úr vörslu hans. Ber leigutaka að greiða að fullu andvirði tækisins\nauk leigu til þess tíma að uppgjör hefur farið fram.","Leigusali er á engan hátt ábyrgur vegna slysa eða skemmda er kynnu að orsakast af notkun, meðferð eða flutningi á tækjum \ner hann leigir út. Sama gildir um vinnustöðvun sem orsakast vegna bilunar á útleigðum tækjum.","Leigugjald reiknast frá þeim tíma að tækið er afhent þar til því er skilað til leigusala. Greiða ber ávallt lágmarksleigu.\n","Ef um langtímaleigu er að ræða, getur leigusali krafist leigu mánaðarlega samkvæmt reikningi. Ef reikningur er ekki greiddur \n 20 dögum eftir úttektarmánuð reiknast lögleyfðir dráttarvextir.","Leiga getur breyst samkvæmt gjaldskrá á útleigutímabilinu. Leigusali áskilur sér rétt til að reikna leigu samkvæmt nýrri gjaldskrá\n er hún hefur tekið gildi.","Leigutaka er óheimilit að lána eða framleigja þau tæki sem hann hefur á leigu nema með skriflegu samþykki leigusala\n","Leigutaki greiðir allan kostnað af flutningi tækisins.\n","Leigusali hefur rétt til hvenær sem honum þóknast að skoða ástand tækisins.\n","Ef leigutaki stendur ekki skil á leigugreiðslum eða brýtur í bága við leigusamning þennan, getur leigusali sótt hið leigða til  \nleigutaka, en er það ekki skylt. Leigusali getur fengið til liðs við sig viðkomandi fógeta eða lögreglu.\nLeigutaki ber allan kostnað af þessum aðgerðum. ","Leigutaki hefur kynnt sér leiguskilmálana og samþykkir þá með undirskrift sinni.\n\n\n"]},{columns:[{text:"F.H. leigutaka:"},{image:c||"",fit:[200,200]},{text:"F.H.Tæki ehf:"},{text:""}]},{text:d("date")(Date.now(),"dd MMMM yyyy")}],styles:{taeki:{fontSize:9},taekib:{fontSize:9,bold:!0}}},f=pdfMake.createPdf(e);f.getBase64(function(c){b.filesInsertWithContent({title:a.kennitala,mimeType:"application/pdf"},{uploadType:"multipart"},c,"base64").promise.then(function(b){console.log("Resp ",b.data.fileSize),a.leigutaki="",a.kt="",a.heimili="",a.umb="",a.kennitala="",a.showUploading=!1,a.hideContent=!1,a.contractVisible=!1},function(a){console.log("Error",a),alert("Villa ",a)})})}}]),angular.module("trelloApp").run(["$templateCache",function(a){a.put("views/gdrive.html",'<!--\n<p>This is the gdrive view.</p>\n\n<h1>New card</h1>\n<div ng-show="pleaseWait" class="alert alert-danger" role="alert">\n    Vinsamlega biðið.\n</div>\n--> <div class="row"> <div class="col-md-12"> <button ng-click="showContract()" class="btn btn-block btn-info">Leiguskilmálar</button> </div> </div> <div class="row" ng-show="contractVisible"> <div> <h4>Leiguskilmálar:</h4> 1. Ofangreint tæki ásamt fylgihlutum hefur leigusali afhent leigutaka í fullkomnu lagi, sem leigutaki hefur kynnt sér. Leigutaki hefur einnig kynnt sér notkun og meðferð tækisins. 2. Leigutaki skal sjá um allan rekstur tækisins á meðan hann hefur það á leigu, svo sem smurningu, smurolíu, eldsneyti, þrif o.fl. 3. Leigutaki er ábyrgur fyrir tjóni sem kann að verða á tækinu og fylgihlutum þess vegna ógætilegrar og/eða rangrar notkunar. 4. Leigutaki ber fulla ábyrgð ef tæki tapast eða því er stolið úr vörslu hans. Ber leigutaka að greiða að fullu andvirði tækisins, auk leigu til þess tíma að uppgjör hefur farið fram. 5. Leigusali er á engan hátt ábyrgur vegna slysa eða skemmda er kynnu að orsakast af notkun, meðferð eða flutningi á tækjum er hann leigir út. Sama gildir um vinnustöðvun sem orsakast vegna bilunar á útleigðum tækjum. 6. Leigugjald reiknast frá þeim tíma að tækið er afhent þar til því er skilað til leigusala. Greiða ber ávallt lágmarksleigu. 7. Ef um langtímaleigu er að ræða, getur leigusali krafist leigu mánaðarlega samkvæmt reikningi. Ef reikningur er ekki greiddur 20 dögum eftir úttektarmánuð reiknast lögleyfðir dráttarvextir. 8. Leiga getur breyst samkvæmt gjaldskrá á útleigutímabilinu. Leigusali áskilur sér rétt til að reikna leigu samkvæmt nýrri gjaldskrá er hún hefur tekið gildi. 9. Leigutaka er óheimilit að lána eða framleigja þau tæki sem hann hefur á leigu nema með skriflegu samþykki leigusala. 10. Leigutaki greiðir allan kostnað af flutningi tækisins. 11. Leigusali hefur rétt til hvenær sem honum þóknast að skoða ástand tækisins. 12. Ef leigutaki stendur ekki skil á leigugreiðslum eða brýtur í bága við leigusamning þennan, getur leigusali sótt hið leigða til leigutaka, en er það ekki skylt. Leigusali getur fengið til liðs við sig viðkomandi fógeta eða lögreglu. Leigutaki ber allan kostnað af þessum aðgerðum. 13. Leigutaki hefur kynnt sér leiguskilmálana og samþykkir þá með undirskrift sinni. </div> </div> <br> <form name="ktInput"> <div class="input-group"> <input required ng-keypress="enterKT($event)" autofocus ng-minlength="10" ng-maxlength="10" ng-model="kt" type="number" class="form-control" placeholder="Slá kt. bara tölur 1234567890" aria-label="Leita i Þjóðskrá"> <span class="input-group-btn"> <button ng-disabled="ktInput.$invalid" ng-click="fetchCustomer()" class="btn btn-secondary" type="button">Leita</button> </span> </div> </form> <hr style="border-color: red"> <div ng-hide="hideContent"> <form name="newCardForm"> <div class="form-row"> <div class="form-group col-md-8"> <label for="Leigutaki">Leigutaki<span style="font-size: x-small">*reqired</span></label> <input ng-model="leigutaki" type="text" class="form-control" id="Leigutaki" placeholder="Leigutaki" required> </div> <div class="form-group col-md-4"> <label for="kt">Kennitala<span style="font-size: x-small">*reqired</span></label> <input ng-model="kennitala" ng-minlength="10" ng-maxlength="10" type="tel" class="form-control" id="kt" placeholder="Slá kt. bara tölur " required> </div> </div> <div class="form-row"> <div class="form-group col-md-8"> <label for="Heimili">Heimili</label> <input ng-model="heimili" type="text" class="form-control" id="Heimili" placeholder="Heimili"> </div> <div class="form-group col-md-4"> <label for="umb">Umb.:</label> <input ng-model="umb" type="text" class="form-control" id="umb" placeholder="Umb."> </div> </div> <!--=================== BEGIN signature pad ======================= --> <div class="row"> <div class="col-md-12" style="height: 220px;  bottom: 20px;    top: 20px;    margin-bottom: 50px;    left: 50px"> <signature-pad style="outline: 0.1px dotted black" accept="accept" clear="clear" height="220" width="600" disabled></signature-pad> </div> <br> <p> <button style="float: left; width: 40%" class="btn btn-warning btn-lg btn-block col-md-6" ng-click="clear()">Clear signature</button> <button style="float: right; width: 40%; margin-top: 0" class="btn btn-success btn-lg btn-block col-md-6" ng-disabled="newCardForm.$invalid" ng-click="signature = accept()">Sign</button> <br> </div> <!--       <div class="form-row">\n            <div class="form-group col-md-12">\n                <br>\n                <h4>Undriskrfit F.hönd Leigutaka:</h4>\n                <br/>\n\n                <div ng-show="signature.dataUrl" style="background: white">\n                    <img ng-src="{{ signature.dataUrl }}">\n                </div>\n            </div>\n        </div>--> <!--=================== END signature pad ======================= --> <!--TODO add form validation on card creation--> <!--    <button ng-disabled="newCardForm.$invalid" ng-click="makeFile()" type="submit"\n                class="btn btn-primary btn-lg btn-block">Create card\n        </button>--> </form> <!--<div id = "bottom"></div>--> </div> <div ng-show="showUploading"> <h1>Uploading ...</h1> </div>'),a.put("views/lskeys.html",'<div ng-hide="clientID" class="alert alert-danger" role="alert"> The Google Drive client ID required ! </div> <div ng-hide="clientSecret" class="alert alert-danger" role="alert"> The Google client secret required ! </div> <div ng-hide="refreshToken" class="alert alert-danger" role="alert"> The Google Refresh Token required ! </div> <div ng-hide="gagnatorgKey" class="alert alert-danger" role="alert"> The Gagnatorg Token required ! </div> <!--\r\n<a href="https://trello.com/app-key" target="_blank">Trello key </a>--> <form> <div class="form-group"> <label for="clientID">Google client ID </label> <input ng-model="clientID" type="text" class="form-control" id="clientID" aria-describedby="Trello key " placeholder="Enter Google Drive client ID"> <small id="emailHelp" class="form-text text-muted"> Never share your KEY with anyone else.</small> </div> <div class="form-group"> <label for="clientSecret">Google client secret </label> <input ng-model="clientSecret" type="text" class="form-control" id="clientSecret" placeholder="Client Secret"> <small class="form-text text-muted"> Never share with anyone else.</small> </div> <div class="form-group"> <label for="refreshToken">Google Refresh Token </label> <input ng-model="refreshToken" type="text" class="form-control" id="refreshToken" placeholder="Refresh Token"> <small class="form-text text-muted"> Never share your TOKEN with anyone else.</small> </div> <div class="form-group"> <label for="gagnatorgKey">Gagnatorg KEY </label> <input ng-model="gagnatorgKey" type="text" class="form-control" id="gagnatorgKey" placeholder="Gagnatorg Key"> <small class="form-text text-muted"> Never share with anyone else.</small> </div> <button ng-click="toLocalStorage()" type="submit" class="btn btn-primary">Submit</button> </form> <hr> <!--\r\n<div>\r\n\r\n    <label>Velja Trello Board :</label>\r\n    <select class="form-control " ng-model="chosenBoard" ng-options="board.name for board in trelloBoards"></select>\r\n\r\n    <button ng ng-show="chosenBoard" ng-click="saveBoard()">Velja</button>\r\n    <span ng-show="savedBoard" class="badge ">Success</span>\r\n</div>\r\n<p/>\r\n\r\n<div ng-show="savedBoard" style="    margin-left: 50px">\r\n    <div>\r\n\r\n        <label>Velja Trello New Card List, núverandi er > {{newCardListName}}</label>\r\n        <select class="form-control " ng-model="chosenNewCardList"\r\n                ng-options="list.name for list in trelloLists"></select>\r\n\r\n        <button ng ng-show="chosenNewCardList" ng-click="saveNewCardList()">Velja List</button>\r\n        <span ng-show="savedList" class="badge badge-success">Success</span>\r\n    </div>\r\n\r\n    <div>\r\n\r\n        <label>Velja Trello Notenda List , núverandi er > {{userListName}} :</label>\r\n        <select class="form-control " ng-model="chosenDriverList"\r\n                ng-options="list.name for list in trelloLists"></select>\r\n\r\n        <button ng ng-show="chosenDriverList" ng-click="saveDriverList()">Velja List</button>\r\n        <span ng-show="savedDriverList" class="badge badge-success">Success</span>\r\n    </div>\r\n</div>\r\n\r\n<hr/>\r\n<div>\r\n\r\n    <label>Velja Trello MACHINES Board :</label>\r\n    <select class="form-control " ng-model="chosenMachinesBoard"\r\n            ng-options="machinesBoard.name for machinesBoard in trelloBoards"></select>\r\n\r\n    <button ng ng-show="chosenMachinesBoard" ng-click="saveMachinesBoard()">Velja</button>\r\n    <span ng-show="savedMachinesBoard" class="badge ">Success</span>\r\n</div>\r\n<p/>\r\n\r\n\r\n<div ng-show="savedMachinesBoard" style="    margin-left: 50px">\r\n\r\n    <label>Velja Trello Machines List , núverandi er > {{machinesListName}}</label>\r\n    <select class="form-control " ng-model="chosenMachineList"\r\n            ng-options="list.name for list in trelloMachinesLists"></select>\r\n\r\n    <button ng ng-show="chosenMachineList" ng-click="saveMachinesList()">Velja List</button>\r\n    <span ng-show="savedMachinesList" class="badge badge-success">Success</span>\r\n</div>\r\n\r\n-->')}]);