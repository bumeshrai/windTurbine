// © copyright 2003 Danish Wind Industry Association
// Globals
ijVersion=4.1;
ijHlpX=100;
ijHlpY=112;
function getLocation(){
	return(location.toString().toLowerCase().replace(/\\/g,"/"));
}
function moveAbsXY(layer,x,y){
	var scroll=getScroll();
	moveXY(layer,x+scroll[0],y+scroll[1]);
	ijHlpX=x;
	ijHlpY=y;
	if (ijRestore) restore();
}
map.prototype.findMe=findMe;
function findMe(s){ // method of map. s is url
	if (this.url.replace(/\.\.\//g,"").search(s)!=-1) return(this);
	for (var i=0;i<this.children.length;i++){
		var r=this.children[i].findMe(s);
		if (r!=null) return(r);
	}
	return(null);
}
map.prototype.findNo=findNo;
function findNo(n){
	if (this.no){
		if (this.no==n) return(this);
	}
	for (var i=0;i<this.children.length;i++){
		var r=this.children[i].findNo(n);
		if (r!=null) return(r);
	}
	return null;
}
function font(s,size,height){
	this.s=s; // style object
	this.size=parseFloat(size);
	this.height=parseFloat(height);
	ijFonts[ijFonts.length]=this;
}
function initFonts(){
	ijFonts=new Array();
	var rules = (ijDOM) ? document.styleSheets[0].cssRules : document.styleSheets[0].rules;
	for (var i=0;i<rules.length;i++){
		if (rules[i].selectorText.search(/stop/i)!=-1) break;
		new font(rules[i].style,rules[i].style.fontSize.replace(/em/i,""),rules[i].style.lineHeight.replace(/em/i,""));
	}
}
function ch(factor){ // change font size in all styles
	hide("hlp0");
	ijBasicFontSize=parseFloat(factor);
	document.cookie='windpower='+escape('fontsize='+ijBasicFontSize+';printsize='+ijPrintPix)+';path=/';
	for (var i=0;i<ijFonts.length;i++){
		ijFonts[i].s.fontSize=(ijBasicFontSize*ijFonts[i].size)+"em";
		if (ijFonts[i].size==ijFonts[i].height) ijFonts[i].s.lineHeight=(ijBasicFontSize*ijFonts[i].size)+"em";
		else ijFonts[i].s.lineHeight=(ijBasicFontSize*ijFonts[i].size+0.14)+"em";
	}
}
function zoom(){
	if (ijDOM) alert(ijTx);
	hide("hlp0");
	resizeLayer("hlp0",new Array(133,195,30,33));
	getStyle("hlp0").overflow="";
	var a='<table width="200"><form name="zoomform"><tr><td align="right">';
	a+='<select align="top" name="printSize" onChange="ch(this.options[this.selectedIndex].value)">';
	a+='<option value="0.65">65%<option value="0.70">70%<option value="0.75">75%<option value="0.8">80%<option value="0.85">85%<option value="0.9">90%<option value="0.95">95%<option value="1">100%<option value="1.05">105%<option value="1.1">110%<option value="1.15">115%<option value="1.20">120%<option value="1.25">125%<option value="1.3">130%<option value="1.35">135%';
	a+='</select></td></tr></form></table>';
	writeToLayer("hlp0",a);
	var z=document.forms.zoomform.elements.printSize;
	for (var i=0;i<z.options.length;i++){
		if (z.options[i].value==ijBasicFontSize){
			z.selectedIndex=i;
			break;
		}
	}
	show("hlp0");
}
function printIt(n,pop){
	if (ijDOM) alert(ijTx);
	if (arguments.length==0){
	hide("hlp0");
	resizeLayer("hlp0",new Array(112,250,30,100));
	getStyle("hlp0").overflow="";
		var fontsize=new Array("Skriftst&oslash;rrelse til udskrift","Schriftgr&ouml;&szlig;e f&uuml;r Dr&uuml;ck","Font size for print","ES","Taille police pour impression","FI");
		var pg=new Array("Side","Seite","Page","Pagina","Page","-FI");
		var ch=new Array("Kapitel","Kapitel","Chapter","Capitulo","Chapitre","-FI");
		var to=new Array("Rundtur","Streifzug","Tour","Visita","Visite","-FI");
		var page=new Array("Printervenlig udskrift af denne side","Dr&uuml;ckerfreundliche Seite","Printer friendly copy of this web page","ES","Version imprimable de cette page","FI");
		var chapter=new Array("Printervenlig udskrift af dette kapitel","Dr&uuml;ckerfreundliche Kapitel","Printer friendly copy of this chapter","ES","Version imprimable de ce chapitre","FI");
		var tour=new Array("Printervenlig udskrift af rundtur","Dr&uuml;ckerfreundliche Streifzug","Printer friendly copy of the guided tour","ES","Version imprimable de la visite guid&eacute;e","FI");
		var style=' style="color: #000000; font-weight: normal; font-size: 11px; line-height: 12px; font-family: Lucida sans,Arial,Helvetica; text-decoration: none;"';
		var a='<table height=23 border=0 cellspacing=0 cellpadding=0>\r<form name=printform>\r<tr>\r<td>\r';
		a+='<select align="top" name="printSize" onChange="printIt(3,this.options[this.selectedIndex].value)" title="'+fontsize[ijLangNo]+'">\r<option value="9px">9px\r<option value="10px">10px\r<option value="11px">11px\r<option value="12px">12px\r<option value="13px">13px\r<option value="14px">14px\r<option value="15px">15px\r<option value="16px">16px\r</select>\r';
		a+='</td>\r<td width=6 height=23>\r<spacer type=block height=23 width=6>\r</td>\r';
		a+='<td><a '+style+'href="javascript:printIt(0)" title="'+page[ijLangNo]+'">\r'+pg[ijLangNo]+'&nbsp;\r</a>';
		if (ijMe.parent.parent!=null){
			if(ijMe.parent.parent.parent!=null){
				if (ijMe.parent.children.length>1) a+='&nbsp<a '+style+'href="javascript:printIt(1)" title="'+chapter[ijLangNo]+'">\r'+ch[ijLangNo]+'\r</a>';
			}
		}
		if (location.toString().substring(0,4)!="http"){
		a+='&nbsp<a '+style+'href="javascript:printIt(2)" title="'+tour[ijLangNo]+'">\r'+to[ijLangNo]+'\r</a>';
		a+='\r</td></tr>\r</form>\r</table>';
		writeToLayer("hlp0",a);
		document.forms.printform.elements.printSize.selectedIndex=ijPrintPix-9;
		show("hlp0");
		}
	}
	else if (n<3) hide("hlp0");
	if (n==0) printPage();
	else if (n==1) chap(false);
	else if (n==2) chap(true);
	else if (n==3) ijPrintPix=parseInt(pop);
}
function printPage(txt){

	if (arguments.length==0) ijSave=document.getElementById("txt0").innerHTML;
	else ijSave=txt;
	wait();
	document.getElementById("hc").src=ijLevel+"css/ps.htm?"+ijPrintPix;
}
function printPage2(classNames,styleDefs){
	var time=(new Date()).getTime();
	var res='<html>\r<head>\r<title>WINDPOWER.org</title>\r</head>\r<body link="0033cc" vlink="0033cc" style="color: #ff0000;">\r';
	res+='<img width=510 height=23 src="../'+ijLanguage+"/"+'r/bgp.gif">\r<br>\r<span style="color: black; font-family: Lucida sans,Arial,Helvetica; font-size: 11px;">Version '+ijVersion+".</span>";
	for (var i=0;i<classNames.length;i++){
		var s=new RegExp('class=["]*'+classNames[i]+'["]*',"gi");
		ijSave=ijSave.replace(s,'style="'+styleDefs[i]+'"');
	}
	ijSave=res+ijSave+'<img width=510 height=23 src="../'+ijLanguage+"/"+'r/bgp.gif">\r</body>\r</html>';
	var w=open("",time,"menubar=yes,status=yes,scrollbars=yes,left=230,resizable=yes,width=570,height=550");
	var d=w.document;
	d.open();
	d.write(ijSave);
	d.close();
	ijSave="";
	hide("hlp0");
}
function getParams(cont,keyword1,keyword2){ // utility gets an array with any number of keyword parameters (between quotemarks)
	r=new Array();
	for (var i=1;i<arguments.length;i++){
		var res="";
		var re=new RegExp(".*"+arguments[i]+"=[\"\' ]*([^\"' >]+).*");
		res=cont.replace(re,"$1");
		r[r.length]=res;
	}
	return(r);
}
function chap(tour){
	if (tour){
		var ask=new Array("Denne funktion vil skive ca. 200 sider og krÊver en computer, der kan hÂndtere meget store websider. VÊr tÂlmodig, det kan tage flere minutter. Du kan downloade en pdf version af webstedet i stedet. Er du sikker pÂ, du vil fortsÊtte?","This function will print approximately 200 pages and requires a computer, which can handle very large web pages. Please be patient, it may take several minutes. You may download a pdf version of the web site instead. Are you sure you wish to continue?","This function will print approximately 200 pages and requires a computer, which can handle very large web pages. Please be patient, it may take several minutes. You may download a pdf version of the web site instead. Are you sure you wish to continue?","This function will print approximately 200 pages and requires a computer, which can handle very large web pages. Please be patient, it may take several minutes. You may download a pdf version of the web site instead. Are you sure you wish to continue?","Cette fonction imprimera 200 pages et exige un ordinateur qui peut gérer des pages Web très grandes. Patientez svp., le processus peut durer plusieurs minutes. Vous pouvez télécharger une version pdf au lieu d'imprimer. Etes vous sûr que vous désirez continuer?","FI");
		if (!confirm(ask[ijLangNo])) return;
	}
	wait();
	ijChapter=new ChapObj(tour);
}
function wait(){
	var w=new Array("Vent venligst","Bitte warten Sie","Please wait","Por favor espera","Attendez svp","-FI");
	writeToLayer("hlp0","<font color='#ff0000'>"+w[ijLangNo]+"...</font>");
	moveAbsXY("hlp0",100,112);
	show("hlp0");
}
function ChapObj(tour){ // if tour=true then all tour chapters + manual
	this.pload=pload;
	this.list=new Array();
	this.data="";
	this.locations=new Array();
	this.headings=new Array();
	var base=new Array(ijMe.parent);
	if (tour){
		base=ijTour.children;
		//this.list[this.list.length]=ijLevel+ijLanguage+"/"+ijSite.url+"?nokill&maxi";
	}
	for (var j=0;j<base.length;j++){
		for (var i=0;i<base[j].children.length;i++){
			if (base[j].children[i].no) this.list[this.list.length]=ijLevel+ijLanguage+"/"+base[j].children[i].url+"?nokill&maxi";
		}
	}
	if (tour){
		for (var i=0;i<ijRefe.children.length;i++){
			if (ijRefe.children[i].no) this.list[this.list.length]=ijLevel+ijLanguage+"/"+ijRefe.children[i].url+"?nokill&maxi";
		}
		//this.list[this.list.length]=ijLevel+ijLanguage+"/"+ijFaqs.url+"?nokill&maxi";
		//this.list[this.list.length]=ijLevel+ijLanguage+"/"+ijCopy.url+"?nokill&maxi";
	}
	this.pload("");
	
}
function pload(data,loc,hd,vol,ch){ // method of ChapObj
	this.data+=data+"<br>";
	this.locations[this.locations.length]=loc;
	this.headings[this.headings.length]=hd;
	if (this.list.length==0){
	// inside links may need to be resolved using anchors
		printPage("<table width=510 border=0 cellpadding=0 cellspacing=0><tr><td width=140></td><td width=370><div class=hd>"+vol+ch+" "+ijMe.parent.name.replace(/-/,"")+"</div>"+this.headings.join("")+"</td></tr></table>"+this.data);
		hide("hlp0");
		return;
	}
	var next=this.list[0];
	var fut=new Array();
	for (var i=1;i<this.list.length;i++) fut[i-1]=this.list[i];  // pop stack
	this.list=fut;
	document.getElementById("hc").src=next;
}
function maxi(){
	var ch="";
	var vol="";
	if (ijMe.parent.parent!=null){
		ch=0;
		while(ijMe.parent!=ijMe.parent.parent.children[ch++]){}
		ch=ch+".";
		if (ijMe.parent.parent.parent!=null){
			vol=0;
			while(ijMe.parent.parent!=ijMe.parent.parent.parent.children[vol++]){}
			vol=vol+".";
		}
	}
	var no=0;
	while (ijMe!=ijMe.parent.children[no++]){}
	parent.writeToLayer("hlp0",vol+ch+no+" "+ijMe.name);
	for (var i=0;i<document.images.length;i++) document.images[i].src=document.images[i].src.replace(/\?.*/,"");
	for (var i=0;i<document.links.length;i++) document.links[i].href=document.links[i].href.replace(/\?.*/,"");
	var data=document.getElementById("txt0").innerHTML.replace(/[\t\r]/g,"");
	// Insert anchor with chapter & page number plus chapter & page number itself
	data=data.replace(/(<div class=["']*hd['"]*[^>]*>)/i,"<a name="+vol+ch+no+"></a>$1"+vol+ch+no+" ");
	var a=data.search(/(<div class=["']*hd['"]*[^>]*>)/i);
	var b=6+a+data.substring(a,data.length).search(/<\/div>/i);
	var header=data.substring(a,b);
	header=header.replace(/hd/,"br1");
	header="<a href=#"+vol+ch+no+">"+header+"</a>";
	data=data.replace(/<[\/]*a[^>]*>/gi,''); // remove all links (again!)
	if (data.search(/<object/i)!=-1){ // remove (one) object, if any.
		data=data.substring(0,data.search(/<object/i))+data.substring(data.search(/<\/object>/i)+9,data.length);
	}
	header=header.replace(/<[\/]*a[^>]*>/gi,'');
	parent.ijChapter.pload(data,location.toString().replace(/\?.*/,""),header,vol,ch);
}
function forward(txt){
	if (arguments.length==0) txt="";
	hide("hlp0");
	var ss=ijMe.url;
	var lang="";
	if (ijMe.url.substring(0,3)=="../"){
		ss=ss.substring(3,ss.length);
		lang=ijLanguage+"/";
	}
	var loc=getLocation().substring(0,getLocation().indexOf(ss));
	goNext = false
	if (ijDomain.findNo(ijMe.no+1) != null){ //Added by Steen Nielsen as a cutoff from the bottom of the list
		var nx=ijDomain.findNo(ijMe.no+1).url;
		goNext = true //added by Steen
	}
	if (goNext == true){ //added by Steen
		if (nx.substring(0,7)=="http://") location=nx;
		else if (ijMe.no<ijActive) location=loc+lang+nx+txt;
	}
}
function back(){
	hide("hlp0");
	var ss=ijMe.url;
	var lang="";
	if (ijMe.url.substring(0,3)=="../"){
		ss=ss.substring(3,ss.length);
		lang=ijLanguage+"/";
	}
	var loc=getLocation().substring(0,getLocation().indexOf(ss));
	goNext = false
	if (ijDomain.findNo(ijMe.no-1) != null){ //Added by Steen Nielsen as a cutoff from the top of the list
		var nx=ijDomain.findNo(ijMe.no-1).url;
		goNext = true; //added by Steen
	}
	if (goNext == true){ //added by Steen
		if (nx.substring(0,7)=="http://") location=nx;
		else if (ijMe.no>0 && goNext == true) location=loc+lang+nx;
	}
}
function home(){
	hide("hlp0");
	var a=ijMe;
	var old=ijMe;
	while (a.parent!=null){
		old=a;
		a=a.parent;
	}
	location=ijLevel+ijLanguage+"/"+old.url;
}
function search(start){
	if (ijDOM) alert(ijTx);
	if (start==true){
		hide("hlp0");
		resizeLayer("hlp0",new Array(133,230,30,33));
		getStyle("hlp0").overflow="";
		var codes=new Array("7369829d4225716b","73670c3b421f7c8b","735472e73b93ef74","7a0b6d6d5b354517","3041220871c09964","");// da de en es fr
		hide("hlp0");
		var search=new Array("S&oslash;g","Suchen","Search","Buscar","Rechercher","FI");
		var a='<table><form name="searchform" method=get action="http://mysearch.looksmart.com/query.go"><tr><td>';
		a+='<input type="text" name="query" size=20 border=0><input type="hidden" name="crid" value="'+codes[ijLangNo]+'"><INPUT NAME="submit" TYPE="submit" VALUE="'+search[ijLangNo]+'" onClick="search(false)"></td></tr></form></table>';
		writeToLayer("hlp0",a);
		show("hlp0");
		document.forms.searchform.elements.query.focus();
	}
	else hide("hlp0");
}

map.prototype.listOLD=listOLD;
function listOLD(){ // method of map
	var a="";
	var s=12;
	var n=null;
	var count=0;
	var t11='<table height='+(s+1)+' border=0 cellspacing=0 cellpadding=0><tr><td width=10 height='+(s+1)+' rowspan=3></td><td width=1 rowspan=3 bgcolor=#999999></td><td height='+(s/2)+' width=11></td><td rowspan=3 height='+(s+1)+'>x</td></tr><tr><td height=1 width=11 bgcolor=#999999></td></tr><tr><td height='+(s/2)+'></td></tr></table>'; // in between, first level
	var t12='<table height '+(s+1)+' border=0 cellspacing=0 cellpadding=0><tr><td width=10 height='+(s+1)+' rowspan=3></td><td width=1 height='+(s/2+1)+' rowspan=2 bgcolor=#999999></td><td height='+(s/2)+' width=11></td><td rowspan=3 height='+(s+1)+'>x</td></tr><tr><td height=1 width=11 bgcolor=#999999></td></tr><tr><td height='+(s/2)+' colspan=2></td></tr></table>'; // end first level
	var base=this;
	if (this.parent!=null){
		base=this.parent;
		if (base.parent!=null){
			a+=getLink(base.parent)+'<br>'; // level -1
			count++;
		}
		a+=getLink(base); // level 0
		count++;
	}
	var e=t11;
	for (var i=0;i<base.children.length;i++){
		n=base.children[i];
		var f=getLink(n);
		if (f==""||base.name==n.name) continue; // Correction 8 June
		a+=e.replace(/x/,f); // level 1
		count++;
		e=t11;
		if (i==base.children.length-2) e=t12;
		if (n==this){
			for (var j=0;j<this.children.length;j++){
				m=this.children[j];
				var d=t11;
				if (j==this.children.length-1) d=t12;
				d=d.replace("<tr>",'<tr><td width=10 height='+(s+1)+' rowspan=3></td><td rowspan=3 width=1 bgcolor=#999999></td><td rowspan=3 width=12></td>'); // expand to next level
				f=getLink(m);
				if (f=="") continue;
				a+=d.replace(/x/,f); // level 2
				count++;
			}
		}
	}
	if (count*(s+1)>370+screen.height-600) document.getElementById("mp").style.overflow="scroll";
	return('<div style="font-size: 11px; line-height: 12px; color=red; font-family: Lucida sans, Gillsans mt,Arial;">'+a+'</div>');
}
function getLink(n){ // utility used listOLD
		var f=n.name;
		var img='<img src="'+ijLevel+'res/arr.gif" width=3 height=5 align=absmiddle>';
		var w='<img src="'+ijLevel+'res/tr.gif" width=5 height=9 align=absmiddle>';
		if (f=="-"||f.charAt(0)=="+"&&n!=ijMe) return("");
		var b= (n==ijMe) ? "#990099" : "#333333";
		var name=f.replace(/ /g,"&nbsp;");
		var url= (n.url.substring(0,5)=="http:") ? n.url : ijLevel+ijLanguage+'/'+n.url;
		if (n.children.length!=0&&url.indexOf("core.htm")==-1){
			url="javascript:writeToLayer('mp',ijDomain.findMe('"+n.url+"').listOLD())";
			w=img;
		}
		if (url.indexOf("/kids/")!=-1||n.parent==null) w=img;
		if (name.charAt(0)=="-"||name.charAt(0)=="+") name=name.substring(1,name.length);
		return('<a href="'+url+'" style="font-size: 11px; color: '+b+'; border: none;">'+w+name+'</a>');
}
function restore(){ // restore  fixed layer locations if scrolling or resizing
	var scroll=getScroll();
	var x=getX("panel");
	var y=getY("panel");
	moveY("panel",scroll[1]+100);
	moveX("panel",scroll[0]);
	var x=getX("mp");
	var y=getY("mp");
	moveY("mp",scroll[1]+164);
	moveX("mp",scroll[0]+35);
	var x=getX("hlp0");
	var y=getY("hlp0");
	moveY("hlp0",scroll[1]+ijHlpY);
	moveX("hlp0",scroll[0]+ijHlpX);
}
function initPage(){
	if (ijDOM||document.layers){
		ijTx="Sorry, this function is not supported by Netscape or Mozilla browsers.";
		if (document.layers) alert("Sorry, this web page is not compatible with Netscape 4.");
	}
	else hide("hlp0");
	var loc=getLocation();
	if (window!=top&&loc.search(/[\?\&]nokill/)==-1) top.location.href=location.href;
	if (loc.substring(0,7)=="http://"){
		var urle=7+loc.substring(7,loc.length).indexOf("/");
		var dom=loc.substring(7,urle);
		if (dom!="192.168.1.7"&&dom!="62.242.59.230"&&dom!="www.windpower.org") location="http://www.windpower.org"+loc.substring(urle,loc.length);
	}
	ijPrintPix=10;
	ijBasicFontSize=1; // em value
	initFonts();
	var lpos=location.pathname.replace(/\\/g,"/").lastIndexOf("/"+ijLanguage+"/");
	var ownAddr;
	if (lpos==-1){ // not in a language folder
		ownAddr=location.pathname.replace(/\\/g,"/").replace(/.*(windweb|windpower)[^\/]*\//gi,"../");
		ijLevel=ownAddr.substring(3,ownAddr.length).replace(/[^\/\\]/g,"").replace(/[\/\\]/g,"../");
	}else{
		ownAddr=location.pathname.replace(/\\/g,"/").substring(lpos+4,location.pathname.replace(/\\/g,"/").length);
		ijLevel="../"+ownAddr.replace(/[^\/\\]/g,"").replace(/[\/\\]/g,"../");
	}
	ijMe=ijDomain.findMe(ownAddr);
	if (ijMe==null){alert("Table error or wrong metatag language."); return;}
	ijPic=new Image(510,23);
	ijPic.src=ijLevel+ijLanguage+"/r/bgp.gif";
	var c=document.cookie;
	var s=c.search(/windpower=/);
	var d="";
	if (s!=-1) d=unescape(c.substring(s+10,c.length).replace(/([^;]*)/,"$1"));
	if (d!=""){
		var fontsize,printsize;
		eval(d);
	if (ijBasicFontSize!=fontsize) ch(fontsize);
	}
	else if (getLocation().search(/[\?\&]maxi/)!=-1){
		maxi();
		return;
	}
	ijMac=false;
	if (-1!=navigator.appVersion.indexOf("Macintosh")) ijMac=true;
	if (ijMac||navigator.appName=="Netscape"){
		getStyle("panel").position="fixed";
		getStyle("hlp0").position="fixed";
		getStyle("mp").position="fixed";
		ijRestore=false;
	}
	else if (document.all){
		onscroll=restore;
		onresize=restore;
		ijRestore=true;
	}
	hide("mp");
	if (ijMe.children.length!=0) writeToLayer("mp",ijMe.listOLD());
	else writeToLayer("mp",ijMe.parent.listOLD());
	show("mp");
	var home=ijDomain.children[0].name;
	var homeUrl=ijLevel+ijLanguage+"/"+ijDomain.children[0].url;
	var back=(new Array("Foreg&aring;ende side","Zur&uuml;ck","Previous page","P&aacute;gina anterior","Page pr&eacute;cendente","FIN"))[ijLangNo];
	var forward=(new Array("N&aelig;ste side","Vorw&auml;rts","Next page","P&aacute;gina siguiente","Page suivante","-FI"))[ijLangNo];
	var print=(new Array("Udskriv","Seite ausdr&uuml;cken","Print page or chapter","Imprimir p&aacute;gina o capitulo","Imprimer la page ou le chapitre","FIN"))[ijLangNo];
	var search=(new Array("Find stikord","Stichw&ouml;rter suchen","Search for keywords","Buscar las palabras","Rechercher les mots","FIN"))[ijLangNo];
	var zoom=(new Array("Skift skriftst&oslash;relse","Schriftgr&ouml;&szlig;e","Font size","P&aacute;gina siguiente","Page suivante","FIN"))[ijLangNo];
	var a='<map name="ijPanelmap">';
//	a+='<area shape="rect" coords="0,0,23,173" href="'+homeUrl+'" title="'+home+'">';
//	a+='<area shape="rect" coords="35,14,52,32" href="javascript:back()" title="'+back+'">';
//	a+='<area shape="rect" coords="63,14,81,32" href="javascript:forward()" title="'+forward+'">';
//	a+='<area shape="rect" coords="86,14,137,32" href="javascript:search(true)" title="'+search+'">';
	var bg=document.body.background.split(/[\\\/]/);
	if (bg[bg.length-1]=="bgn.gif"){
//		a+='<area shape="rect" coords="142,14,187,32" href="javascript:printIt()" title="'+print+'">';
//		a+='<area shape="rect" coords="191,14,225,32" href="javascript:zoom()" title="'+zoom+'">';
	}
	a+='</map>';
//	a+='<img height="45" width="230" ismap usemap="#ijPanelmap" src="'+ijLevel+'res/tr.gif">';
//	writeToLayer("panel",a);
	if (getLocation().search(/[\?\&]test/)!=-1){ 
writeToLayer("txt0",document.getElementById("txt0").innerHTML.replace(/<(div[^>]*)>/gi,'&lt;$1&gt;<$1>').replace(/<(\/div[^>]*)>/gi,'<$1>&lt;$1&gt;').replace(/<(span[^>]*)>/gi,'&lt;$1&gt;<$1>').replace(/<(\/span[^>]*)>/gi,'<$1>&lt;$1&gt;'));
	}
	//var fine=checkIt();
	//if (!fine) alert("Error on this page! Please notify us!");
	var interval=parseInt(getLocation().replace(/.+[&\?]slideshow=([\d]+)[^\d]*.*/,"$1"));
	if (!isNaN(interval)){
		if (document.images.length>2) setTimeout("scrollTo(0,document.images[document.images.length-2].offsetTop)",interval*500);
		setTimeout("forward('"+getLocation().replace(/.*(\?.*)/,"$1")+"')",interval*1000);
	}
}
function checkIt(){
	var err="";
	// Check for en hd class div-tag
	var divs=document.getElementsByTagName("div");
	var hdok=false;
	var t0=false;
	var t1=false;
	var h0=false;
	var h1=false; 
	var h2=false;
	var mpx=false; 
	for (var i=0;i<divs.length;i++){
		if (divs[i].className=="hd"||ijMe.url.indexOf("core.htm"!=-1)) hdok=true;
	}
	if (!hdok) err+="div-tag with hd class missing.\r";
	ijStopCheck=false;
	var doc=document.getElementsByTagName("html")[0].innerHTML;
	if (doc.search(/<\/a>\s*[\.,;]/i)!=-1) err+="Link followed by . or , or ;\r";
	// setTimeout("for (var i=0;i<document.images.length;i++){if (!document.images[i].complete&&ijStopCheck==false){ijStopCheck=true;alert('Possibly wrong image address! '+document.images[i].src+' took more than 2.5 seconds to load');}}",2500);
	var metas=document.getElementsByTagName("meta");
	var dwia=false;
	var desc=false;
	var keyw=false;
	var robo=false;
	for (var i=0;i<metas.length;i++){
		if (metas[i].name.toLowerCase()=="dwia"){
			dwia=true;
			if (metas[i].content!="") err+="dwia metatag has wrong value, should be empty.\r";
		}
		else if (metas[i].name.toLowerCase()=="content-language"){
			var lang=metas[i].content.substring(0,2).toLowerCase();
			var trueAdr="http://www.windpower.org/"+lang+"/"+ijMe.url;
			if (ijMe.url.substring(0,3)=="../") trueAdr="http://www.windpower.org/"+ijMe.url.substring(3,ijMe.url.length);
			if (doc.lastIndexOf(trueAdr)==-1&&ijMe.name.charAt(0)!="+") err+="Missing or incorrect URL at the bottom of this page. Address should be: "+trueAdr+"\r"
			var aok=true;
			if (lang=="da"&&doc.lastIndexOf("Vent venligst...")==-1) aok=false;
			if (lang=="de"&&doc.lastIndexOf("Bitte warten Sie...")==-1) aok=false;
			if (lang=="en"&&doc.lastIndexOf("Please wait...")==-1) aok=false;
			if (lang=="es"&&doc.lastIndexOf("Por favor espera...")==-1) aok=false;
			if (lang=="fr"&&doc.lastIndexOf("Attendez svp...")==-1) aok=false;
			//if (aok==false) err+="Incorrect language or missing 'Please wait...'";
		}
		else if (metas[i].name.toLowerCase()=="keywords") keyw=true;
		else if (metas[i].name.toLowerCase()=="description") desc=true;
		else if (metas[i].name.toLowerCase()=="robots") robo=true;
	}
	if (dwia==false) err+="Meta tag dwia missing - please insert one.\r";
	if (keyw==false) err+="Meta tag keywords missing - please insert one.\r";
	if (desc==false) err+="Meta tag description missing - please insert one.\r";
	if (robo==false) err+="Meta tag robots missing - please insert one.\r";
	var stack=new Array();
	var k=0;
	doc=doc.replace(/\r/g," ");
	doc=doc.replace(/<\/script>/ig,"§").replace(/<script[^>]*>[^§]*§/ig,"");
	var doc=doc.split("<");
	var tags=new Array("html","div","tr","td","table","a","title","head","map","form","body","select","noscript","iframe","ol","ul","span","iframe","object","textarea");
	var ntags=new Array("meta","link","img","br","area","input","option","/option","!--","hr","spacer","tbody","/tbody","li","/li","param","embed","/embed");
	for (var i=1;i<doc.length;i++){
		var found;
		for (j=0;j<tags.length;j++){
			found=false;
			if (doc[i].substring(0,tags[j].length).toLowerCase()==tags[j]&&doc[i].substring(0,4).toLowerCase()!="area"){
				stack[k]=tags[j];
				k++;
				found=true;
				break;
			}
			else if (doc[i].substring(0,tags[j].length+1).toLowerCase()=="/"+tags[j]){
				k--;
				if (k<0){
					k=0;
					err+="HTML syntax error(s) on page: Tag stack underflow! </"+tags[j]+">\r";
				}
				if (stack[k]!=tags[j]) err+="HTML syntax error(s) on page: <"+stack[k]+"> does not match </"+tags[j]+">\r";
				found=true;
				break;
			}
		}
		if (found==false){
			for (var j=0;j<ntags.length;j++){
				if (doc[i].substring(0,ntags[j].length).toLowerCase()==ntags[j]){
					found=true;
					break;
				}
			}
			if (found==false) err+="HTML syntax error(s): <"+doc[i]+" tag found\r";
		}
	}
	if (k!=0) err+="HTML syntax error(s): HTML tack stack overflow (assymetry)! <"+stack[k-1]+"\r";
	if (err.length!=0){
		getStyle("hlp0").width="400px";
		getStyle("hlp0").height="300px";
		getStyle("hlp0").zIndex=22;
		getStyle("hlp0").border="red ridge 6px";
		moveXY("hlp0",230,200);
		writeToLayer("hlp0","<div style='margin: 6px;'>"+(err.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r/g,"<br>"))+"<br><a href=javascript:hide('hlp0')>Close</a></div>");
		show("hlp0");
		return false;
	}
	return true;
}
String.prototype.specialChar=specialChar;
function specialChar(){
	var r=this.replace(/Ê/g,"&aelig;");
	r=r.replace(/Â/g,"&aring;");
	r=r.replace(/·/g,"&aacute;");
	r=r.replace(/‡/g,"&agrave;");
	r=r.replace(/‰/g,"&auml;");
	r=r.replace(/‚/g,"&acirc;");
	r=r.replace(/È/g,"&eacute;");
	r=r.replace(/Ë/g,"&egrave;");
	r=r.replace(/Î/g,"&euml;");
	r=r.replace(/Í/g,"&ecirc;");
	r=r.replace(/Ì/g,"&iacute;");
	r=r.replace(/Ó/g,"&icirc;");
	r=r.replace(/¯/g,"&oslash;");
	r=r.replace(/Û/g,"&oacute;");
	r=r.replace(/ˆ/g,"&ouml;");
	r=r.replace(/Ù/g,"&ocirc;");
	r=r.replace(/˙/g,"&uacute;");
	r=r.replace(/˘/g,"&ugrave;");
	r=r.replace(/¸/g,"&uuml;");
	r=r.replace(/Á/g,"&ccedil;");
	r=r.replace(/Ò/g,"&ntilde;");
	r=r.replace(/ﬂ/g,"&szlig;");
	r=r.replace(/∆/g,"&AElig;");
	r=r.replace(/≈/g,"&Aring;");
	r=r.replace(/¡/g,"&Aacute;");
	r=r.replace(/¿/g,"&Agrave;");
	r=r.replace(/ƒ/g,"&Auml;");
	r=r.replace(/¬/g,"&Acirc;");
	r=r.replace(/…/g,"&Eacute;");
	r=r.replace(/»/g,"&Egrave;");
	r=r.replace(/À/g,"&Euml;");
	r=r.replace(/ /g,"&Ecirc;");
	r=r.replace(/Õ/g,"&Iacute;");
	r=r.replace(/Œ/g,"&Icirc;");
	r=r.replace(/ÿ/g,"&Oslash;");
	r=r.replace(/”/g,"&Oacute;");
	r=r.replace(/÷/g,"&Ouml;");
	r=r.replace(/‘/g,"&Ocirc;");
	r=r.replace(/⁄/g,"&Uacute;");
	r=r.replace(/Ÿ/g,"&Ugrave;");
	r=r.replace(/‹/g,"&Uuml;");
	r=r.replace(/«/g,"&Ccedil;");
	r=r.replace(/—/g,"&Ntilde;");
	r=r.replace(/¯/g,"&iquest;");
	r=r.replace(/°/g,"&iexcl;");
	r=r.replace(/©/g,"&copy;");
	r=r.replace(/°/g,"&deg;");
	return(r);
}
initPage();