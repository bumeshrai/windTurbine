// © Copyright 2002 Danish Wind Industry Association
//onerror=err;
//function err(a,b,c){alert(a+" line "+(c-1));}
ijAgent=window.navigator.userAgent;
ijDOM=((document.getElementById) && !(ijAgent.indexOf("MSIE")!=-1&&parseInt(ijAgent.charAt(ijAgent.indexOf("/")+1),10)<6)) ? true : false;
gData=new Array();

function changeURL(src,name,layer){
	if (document.all||ijDOM) document.images[name].src=src;
	if (document.layers){
		if (arguments.length==3){
			document.layers[layer].document.images[name].src=src;
		}else{
			document.images[name].src=src;
		}
	}	
} // 20 PC
function getScroll(){
	if (document.all) return(new Array(document.body.scrollLeft,document.body.scrollTop));
	else if (ijDOM) return(new Array(window.pageXOffset,window.pageYOffset));
}
function moveX(layer,x){
	x=Math.round(x);
	if (ijDOM) document.getElementById(layer).style.left=x;
	else if (document.layers) document.layers[layer].left=x;
	else if (document.all) document.all(layer).style.posLeft=x;
}
function moveY(layer,y){
	y=Math.round(y);
	if (ijDOM) document.getElementById(layer).style.top=y;
	else if (document.layers) document.layers[layer].top=y;
	else if (document.all) document.all(layer).style.posTop=y;
}
function moveZ(layer,z){
	z=Math.round(z);
	if (ijDOM) document.getElementById(layer).style.zIndex=z;
	else if (document.layers) document.layers[layer].zIndex=z;
	else if (document.all) document.all(layer).style.zIndex=z;
}
function moveXY(layer,x,y){
	moveX(layer,x);
	moveY(layer,y);
}
function slideXY(layer,x,y,totalMsec,noLeft){ // utility (the last operand is for internal use only)
	if (arguments.length==4){ // first time only
		noLeft=Math.round(totalMsec/67);
		show(layer);
	}
	if (noLeft==0) return;
	var xnow=getX(layer);
	var ynow=getY(layer);
	if (x-xnow!=0) moveX(layer,xnow+(x-xnow)/noLeft);
	if (y-ynow!=0) moveY(layer,ynow+(y-ynow)/noLeft);
	noLeft--;
	setTimeout("slideXY('"+layer+"',"+x+","+y+","+totalMsec+","+noLeft+")",10);
}
function getStyle(layer){
	return(document.getElementById(layer).style);
}
function getX(layer){
	var x;
	if (ijDOM){
		x=document.getElementById(layer).style.left;
		if (x=="") x=getStyle(layer).left;
		return(parseInt(x));
	}
	else if (document.layers) return(document.layers[layer].left);
	else if (document.all){
		x=parseInt(document.getElementById(layer).currentStyle.left);
		if (x) return(x);
		return(parseInt(getStyle(layer).left));
	}
	return(0);
}
function getY(layer){ // utility to get top Y position of a layer
	var y;
	if (ijDOM){
		y=document.getElementById(layer).style.top;
		if (y=="") y=getStyle(layer).top;
		return(parseInt(y));
	}
	else if (document.layers) return(document.layers[layer].top);
	else if (document.all){
		y=parseInt(document.getElementById(layer).currentStyle.top);
		if (y) return(y);
		return(parseInt(getStyle(layer).top));
	}
	return(0);
}
function getWidth(layer){
	var width;
	if (ijDOM){
		width=document.getElementById(layer).style.width;
		if (width=="") width=getStyle(layer).width;
		return(parseInt(width));
	}
	else if (document.layers) return(document.layers[layer].width);
	else if (document.all){
		width=parseInt(document.getElementById(layer).currentStyle.width);
		if (width) return(width);
		return(parseInt(getStyle(layer).width));
	}
	return(0);
}
function getHeight(layer){
	var height;
	if (ijDOM){
		height=document.getElementById(layer).style.height;
		if (height=="") height=getStyle(layer).height;
		return(parseInt(height));
	}
	else if (document.layers) return(document.layers[layer].height);
	else if (document.all){
		height=parseInt(document.getElementById(layer).currentStyle.height);
		if (height) return(height);
		return(parseInt(getStyle(layer).height));
	}
	return(0);
}
function getZ(layer){ // utility to get z-index of layer
	var z;
	if (ijDOM){
		z=document.getElementById(layer).style.zIndex;
		if (z=="") z=getStyle(layer).zIndex;
		return(parseInt(z));
	}
	else if (document.layers) return(document.layers[layer].zIndex);
	else if (document.all){
		z=parseInt(document.getElementById(layer).currentStyle.zIndex);
		if (z) return(z);
		return(parseInt(getStyle(layer).zIndex));
	}
	return(0);
}
function writeToLayer(layer,text){
	if (ijDOM){
		var over = document.getElementById(layer);
		var range = document.createRange();
		range.setStartBefore(over);
		var domfrag = range.createContextualFragment(text);
		while (over.hasChildNodes()) {
			over.removeChild(over.lastChild);
		}
		over.appendChild(domfrag);
	}
	else if (document.layers){
		document.layers[layer].document.open();
		var w=document.layers[layer].clip.width;
		if (text.charAt(0)!="<") text="<table border='0' cellspacing='0' cellpadding='0' width='"+w+"'><tr><td bgcolor='#FFFFFF'>"+text+"</td></tr></table>";
		document.layers[layer].document.write(text);
		document.layers[layer].document.close();
	}
	else if (document.all){
		document.getElementById(layer).innerHTML="";
		document.getElementById(layer).innerHTML=text;
	}
}
function show(layerNames){
	for (var i=0;i<arguments.length;i++){
		if (ijDOM) document.getElementById(arguments[i]).style.visibility="visible";
		else if (document.layers) document.layers[arguments[i]].visibility="show";
		else if (document.all) document.all(arguments[i]).style.visibility="visible";
	}
}
function hide(layerNames){
	for (var i=0;i<arguments.length;i++){
		if (ijDOM) document.getElementById(arguments[i]).style.visibility="hidden";
		else if (document.layers) document.layers[arguments[i]].visibility="hide";
		else if (document.all) document.all(arguments[i]).style.visibility="hidden";
	}
}
function setCursor(layer,c){
	if (ijDOM) document.getElementById(layer).style.cursor=c;
	else if (document.layers) document.layers[layer].cursor=c;
	else if (document.all) document.all(layer).style.cursor=c;
}
function root(m,init){
	var r=init;
	var rton=1;
	var dk=new Array(m.length);
	for (var i=0;i<m.length;i++){
		dk[i]=m[i]*i;
	}
	var oldr=0;
	var k=0;
	var t=0;
	var max=dk.length-1;
	var sum=0;
	while(Math.abs(r-oldr)>=0.00001&&t<10){
		t+=1;
		rton=1;
		k=0;
		sum=0;
		for (var i=0;i<max;i++){
			sum+=rton*dk[i+1];
			k+=m[i]*rton;
			rton*=r;
		}
		k+=m[i]*rton;
		oldr=r;
		r=r-k/sum;
	}
	if (t==10){
		alert(m+" Result cannot be computed");
		r=1;
	}
	return(r);
}
function edit(n,d){
	if (d==0) return(Math.round(n).toString());
	var z="0000000000000000";
	var f=Math.pow(10,d);
	var r=Math.round(n*f).toString();
	if (r.length<=d) return("0."+z.substring(0,d-r.length)+r);
	return(r.substring(0,r.length-d)+"."+r.substring(r.length-d,r.length));
}
function resizeLayer(layer,r){ // r is an array with (top,width,height,left)
	var style=null;
	if (ijDOM) style=document.getElementById(layer).style;
	else if (document.all) style=document.all(layer).style;
	else if (document.layers) style=document.layers[layer];
	style.top=r[0];
	style.width=r[1];
	style.height=r[2];
	style.left=r[3];
}
function changeBackground(layer,src){
	var style=null;
	if (ijDOM) style=document.getElementById(layer).style;
	else if (document.all) style=document.all(layer).style;
	else if (document.layers) style=document.layers[layer];
	style.background="url("+src+")";
}
function setClip(layer,r){ // r is an array with top,right,bottom,left (top,width,height,left for NN4)
	var rect="rect("+r[0]+"px, "+r[1]+"px, "+r[2]+"px, "+r[3]+"px)";
	if (ijDOM) document.getElementById(layer).style.clip=rect;
	else if (document.layers){
		document.layers[layer].clip.top=r[0];
		document.layers[layer].clip.width=r[1];
		document.layers[layer].clip.height=r[2];
		document.layers[layer].clip.left=r[3];
		}
	else if (document.all) document.all(layer).style.clip=rect;
}
function getClip(lr){ // lr is layer name. Returns array with top,right,bottom,left (top,wdth,height,left for NN4)
	var x="";
	if (ijDOM){
		x=document.getElementById(lr).style.clip;
		if (x=="") x=getStyle(lr).clip;
	}
	else if (document.layers){
		var d=document.layers[lr];
		return(new Array(d.clip.top,d.clip.width,d.clip.height,d.clip.left));
		}
	else if (document.all){
		x=document.all(lr).style.clip;
		if (!x) x=getStyle(lr).clip; // PC
		if (x=="auto") x=document.all(lr).currentStyle.clip; // Mac
	}
	return(eval("new Array("+x.replace(/ /g,",").replace(/[^0-9\,]/g,"")+")"))
}
function slideClip(layer,r,totalMsec,noLeft){ // utility (the last operand is for internal use only)
	if (arguments.length==3){ // first time only
		noLeft=Math.round(totalMsec/67);
		show(layer); // rect is array with top,right,bottom,left
	}
	if (noLeft==0) return;
	var clipNow=getClip(layer);
	var clipNew=new Array();
	for (var i=0;i<4;i++){
		clipNew[i]=Math.round(clipNow[i]+((r[i]-clipNow[i])/noLeft));
	}
	setClip(layer,clipNew);
	noLeft--;
	setTimeout("slideClip('"+layer+"',(new Array("+r[0]+","+r[1]+","+r[2]+","+r[3]+")),"+totalMsec+","+noLeft+")",10);
}
function up(){
	fob.f.value++;
	power();
}
function down(){
	fob.f.value--;
	power();
}
function upw(){
	fob.vt.value++;
	power();
}
function downw(){
	fob.vt.value--;
	power();
}
function listData(){
	var dataNames=new Array("#","F","c<SUB>D</SUB>","v<SUB>T</SUB>","v<SUB>P</SUB>","&lambda;","P","c<SUB>P</SUB>");
	var buf="<TABLE BORDER='1' CELLSPACING='0' CELLPADDING='1'><TR>";
	for (var i=0;i<dataNames.length;i++){
		buf+="<TD ALIGN='CENTER'><A HREF='javascript:sort("+i+")'>"+dataNames[i]+"</A></TD>";
	}
	buf+="</TR>";
	for (var i=0;i<gData.length;i++){
		buf+="<TR><TD ALIGN='RIGHT'><FONT SIZE='-2' FACE='lucida sans,courier,arial'><A HREF='javascript:d("+i+")'>"+(i+1)+"</A></FONT></TD>";
		for (var j=0;j<gData[i].length;j++){
			buf+="<TD ALIGN='RIGHT'><FONT SIZE='-2' FACE='lucida sans,courier,arial'>"+edit(gData[i][j],2)+"</FONT></TD>";
		}
		buf+="</TR>";
	}
	buf+="</TABLE>";
	writeToLayer("log",buf);
}
function unpk(){ // Property of Array. Makes an array of arrays of (x,y) coordinate pairs, or (x,y1,y2) triplets etc.
	var n=this.columns;
	if (n==null) {alert("ERROR! column property missing");return null;}
	var res=new Array();
	for (var i=0;i<this.length;i+=n){
		var help=new Array();
		for (var j=0;j<n;j++){
			help[help.length]=this[i+j];
		}
		res[res.length]=help;
	}
	res.columns=this.columns;
	return(res);
}
Array.prototype.unpk=unpk;
function normalise(height,width){  // Property of an n column array with x and (multiple) y values.
	 var min=new Array();
	 var max=new Array();
	 var units=new Array();
	 var factors=new Array();
	 var h=new Array();
	 for (var j=0;j<this[0].length;j++){
	 	min[j]=9E99;
	 	max[j]=-9E99;
	 	units[j]=1;
	 	factors[j]=1;
	 	h[j]=1;
	 }
	 for (var i=0;i<this.length;i++){
	 	for (var j=0;j<this[i].length;j++){
	 		if (this[i][j]<min[j]) min[j]=this[i][j];
	 		if (this[i][j]>max[j]) max[j]=this[i][j];
	 	}
	 }
	 var nymin=9E99;
	 var nymax=-9E99;
	 for (var j=1;j<min.length;j++){ // multiple y-columns, find same minimum for all y-columns
	 	if (min[j]<nymin) nymin=min[j];
	 	if (max[j]>nymax) nymax=max[j];
	 }
	 for (var j=1;j<min.length;j++){ // multiple y-columns
	 	min[j]=nymin;
	 	max[j]=nymax;
	 }
	 var base=Math.log(10);
	 for (var j=0;j<min.length;j++){ // find rounded values of min and max
	 	if (Math.abs(min[j])>Math.abs(max[j])){ // test for largest absolute number
	 		h[j]=Math.pow(10,Math.floor(Math.log(Math.abs(min[j]))/base)-1);
	 	}else{
	 		h[j]=Math.pow(10,Math.floor(Math.log(Math.abs(max[j]))/base)-1);
	 	}
	 	max[j]=h[j]*Math.ceil(max[j]/h[j]);
	 	min[j]=Math.floor(h[j]*Math.floor(min[j]/h[j]));
	 	if (j==0){
	 		units[j]=Math.floor(width/Math.round((max[j]-min[j])/h[j]));
	 		factors[j]=units[j]*Math.round((max[j]-min[j])/h[j]);
	 	}else{
	 		units[j]=Math.floor(height/Math.round((max[j]-min[j])/h[j]));
	 		factors[j]=units[j]*Math.round((max[j]-min[j])/h[j])
	 	}
	 }
	 //alert("min="+min+" max="+max+" units="+units+" factors="+factors+" h="+h);
	 this.min=min;
	 this.max=max;
	 this.units=units;
	 this.factors=factors;
	 this.h=h;
	 var res=this;
	 for (var i=0;i<this.length;i++){
	 	for (var j=0;j<this[i].length;j++){
	 		res[i][j]=Math.round(factors[j]*(this[i][j]-min[j])/(max[j]-min[j]));	
	 	}
	 }
	 res.columns=this.columns;
	 return(res);
}
Array.prototype.normalise=normalise;
function ravel(){// makes an n-column array with x, y1, y2... in columns into one long 3-column array with x,y,curvenumber values
	var res=new Array();
	for (var k=1;k<this[0].length;k++){
		for (var i=0;i<this.length;i++){
			res[res.length]=new Array(this[i][0],this[i][k],k-1);
		}
	}
	res.columns=3;
	return(res);
}
Array.prototype.ravel=ravel;
function fiveOrTen(n,h){
	var help=parseInt(Math.abs(n/h)+0.5);
	if (help%5==0){
		var decs=(Math.round(1/h)).toString().length-1;
		// var h=n.toString();
		// var x=h.indexOf("0000");
		// if (x>0) h=h.substring(0,x);
		// if (h.charAt(0)=="-") h="-&nbsp;"+h.substring(1,h.length);
		return(edit(n,decs));
	}else{
		return("");
	}
}

function interpolate(d){ // Property of an n column array with x and y values. x in first column. y in subsequent columns. y and x are integers
// Inserts coordinates between observations where one or more steps are missing
// d is the column on which to do the interpolation
	var res=new Array();
	res[res.length]=this[0]; // first pair, triplet etc.
	for (var i=1;i<this.length;i++){
		if (Math.abs(this[i][d]-this[i-1][d])>1){ // if step length above 1
			var n=this[i][d]-this[i-1][d];
			var nAbs=parseInt(Math.abs(n));
			for (var j=1;j<nAbs;j++){
				var help=new Array();
				for (var k=0;k<this[i].length;k++){
					if (k==d){
						help[help.length]=parseInt(this[i-1][k]+j*n/nAbs);
					}else{
						help[help.length]=parseInt(Math.round(j*(this[i][k]-this[i-1][k])/nAbs+this[i-1][k]));
					}
				}
				res[res.length]=help;
			}
		}
		res[res.length]=this[i];
	}
	return(res);
}
Array.prototype.interpolate=interpolate;
function sorter1(a,b){
	return(b[1]-a[1]);
}
function sorter0(a,b){
	return(a[0]-b[0]);
}
function draw(height,width,name,xtext,ytext){ // property of array: columns are x, y1, y2...
	var pixes=new Array("../../res/bluepix.gif","../../res/redpix.gif");
	// var pair=this.unpk();
	var pair=this;
	var coords=pair.normalise(height,width);
	for (var i=coords[0].length-1;i>=0;i--){
		coords=coords.interpolate(i)
	}
	
	var max=Math.round(pair.factors[1]/pair.units[1])+1; // compute y-axis tickmarks and captions
	var step=(pair.max[1]-pair.min[1])/(max-1);
	var buf=""; // buffer for tickmarks
	var capt=new Array(); // captions for y-axis
	var pixels=new Array(); // cell heights
	for (var i=0;i<max;i++){
		var len=2;
		var cap=fiveOrTen(pair.max[1]-i*step,pair.h[1]);
		if (cap!=""){
			len=5;
			if (i!=0){
				capt[capt.length]=cap;
				pixels[pixels.length]=i*pair.units[1];
			}
		}
		buf+="<IMG SRC='../../res/blpix.gif' WIDTH='"+len+"' HEIGHT='1'>";
		if (i!=max-1) buf+="<BR><IMG SRC='../../r/t.gif' WIDTH='6' HEIGHT='"+(pair.units[1]-1)+"'><BR>";
	}
	for (var i=pixels.length-1;i>0;i--) pixels[i]=pixels[i]-pixels[i-1];
	//alert("(min,max)=("+pair.min[0]+","+pair.max[0]+") units="+pair.units[0]+" width="+width);
	var maxx=Math.round(pair.factors[0]/pair.units[0])+1; // compute x-axis tickmarks and labels
	step=(pair.max[0]-pair.min[0])/(maxx-1);
	var bufx="";
	var captx=new Array(); // captions for x-axis
	var pixelsx=new Array(); // cell widths
	for (var i=0;i<maxx;i++){
		var hi=2;
		cap=fiveOrTen(pair.min[0]+i*step,pair.h[0]);
		if (cap!=""){
			hi=5;
			captx[captx.length]=cap;
			pixelsx[pixelsx.length]=i*pair.units[0];
		}
		bufx+="<IMG ALIGN='TOP' SRC='../../res/blpix.gif' WIDTH='1' HEIGHT='"+hi+"'>";
		if (i!=maxx-1) bufx+="<IMG ALIGN='TOP' SRC='../../r/t.gif' WIDTH='"+(pair.units[0]-1)+"' HEIGHT='5'>";
	}
	var used=0;
	for (var i=pixelsx.length-1;i>0;i--){
		pixelsx[i]=pixelsx[i]-pixelsx[i-1];
	}
	var slack=height-pair.factors[1]+1; // leftover space at top
	// alert("antal enh="+max+" step i step="+step+"\rmin="+pair.min[1]+ " max="+pair.max[1]+" factors="+pair.factors[1]+" units="+pair.units[1]+" h="+pair.h[1]);
	var win2=open("","xb2","scrollbars=yes,resizable=yes,height="+(height+80)+",width="+(width+80));
	win2.window.moveTo(560,0);
	win2.document.open();
	win2.document.write("<HTML><HEAD><TITLE>"+name+"</TITLE></HEAD>");
	win2.document.write("<BODY BGCOLOR='#ffffff' LINK='#0066cc' VLINK='#333333'>");
	win2.document.write("<FONT FACE='lucida sans, Gillsans mt mt,frutiger,helvetica,geneva,arial'>"+ytext+"</FONT><BR>");
	win2.document.write("<TABLE BORDER='0' CELLSPACING='0' CELLPADDING='0' HEIGHT='100' WIDTH='100'><TR>");
	
	win2.document.write("<TD HEIGHT='"+(pixels[0]+slack)+"' VALIGN='BOTTOM' ALIGN='RIGHT'>"); // first y-caption
	win2.document.write("<FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' SIZE='1'>"+capt[0]+"</FONT></TD>");
	
	win2.document.write("<TD WIDTH='6' VALIGN='BOTTOM' ALIGN='RIGHT' ROWSPAN='"+pixels.length+"'>"); // y-tickmarks
	win2.document.write(buf+"</TD>");
	
	win2.document.write("<TD WIDTH='1' VALIGN='BOTTOM' ALIGN='RIGHT' ROWSPAN='"+pixels.length+"'>"); // y-axis
	win2.document.write("<IMG SRC='../../res/blpix.gif' WIDTH='1' HEIGHT='"+(1+pair.factors[1])+"'></TD>");
	
	win2.document.write("<TD ROWSPAN='"+pixels.length+"' COLSPAN='"+captx.length+"' VALIGN='BOTTOM'>"); // the plot itself
	coords=coords.ravel(); // split multi-column array
	coords=coords.sort(sorter1); // sort in descending y order
	if (slack>0) win2.document.write("<IMG HEIGHT='"+slack+"' WIDTH='"+width+"' SRC='../../r/t.gif'><BR>");
	for (var i=0;i<coords.length;i++){ // Gather all data for same y-value into one array
		var help=new Array();
		help[help.length]=coords[i];
		if (i<coords.length-1){
			var j=i+1;
			while (coords[i][1]==coords[j][1]){
				help[help.length]=coords[j++];
				if (j>coords.length-1) break;
			}
			i=j-1;
		}
		help=help.sort(sorter0); // sort in ascending x order
		var acc=0;
		var old=-999;
		for (var j=0;j<help.length;j++){
			if (old!=help[j][0]){
				if (help[j][0]-acc>0) win2.document.write("<IMG HEIGHT='1' WIDTH='"+(help[j][0]-acc)+"' SRC='../../r/t.gif'>");
				win2.document.write("<IMG HEIGHT='1' WIDTH='1' SRC='"+pixes[help[j][2]%pixes.length]+"'>");
				acc=help[j][0]+1;
				old=help[j][0];
			}
		}
		if (i<coords.length-1) win2.document.write("<BR>");
	}
	win2.document.write("</TD></TR>");
	
	for (var i=1;i<pixels.length;i++){ // subsequent y-captions
		win2.document.write("<TR><TD HEIGHT='"+pixels[i]+"' VALIGN='BOTTOM' ALIGN='RIGHT'>");
		win2.document.write("<FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' SIZE='1'>"+capt[i]+"</FONT></TD></TR>");
	}
	
	win2.document.write("<TR><TD HEIGHT='1' COLSPAN='3'></TD><TD HEIGHT='1' COLSPAN='"+captx.length+"'>"); // x-axis
	win2.document.write("<IMG SRC='../../res/blpix.gif' HEIGHT='1' WIDTH='"+(1+pair.factors[0])+"'></TD></TR>");
	
	win2.document.write("<TR><TD HEIGHT='5' COLSPAN='3' VALIGN='TOP'></TD><TD COLSPAN='"+captx.length+"' HEIGHT='5'>"+bufx+"</TD></TR>"); // x-tickmarks	
	
	win2.document.write("<TR><TD HEIGHT='1' COLSPAN='3'></TD>"); // x-captions
	for (var i=0;i<captx.length;i++){
		if (i!=captx.length-1){
			win2.document.write("<TD WIDTH='"+pixelsx[i+1]+"' ALIGN='LEFT'><FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' SIZE='1'>"+captx[i]+"</FONT><BR><IMG SRC='../../r/t.gif' HEIGHT='1' WIDTH='"+pixelsx[i+1]+"'></TD>");
		}else{
			win2.document.write("<TD ALIGN='LEFT' WIDTH='"+width+"'><FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' SIZE='1'>"+captx[i]+"</FONT></TD>");
		}
	}
	
	win2.document.write("<TR><TD COLSPAN='"+(3+captx.length)+"' ALIGN='RIGHT'><FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' SIZE='1'>"+xtext+"</FONT></TD></TR>");
	win2.document.write("<TR><TD COLSPAN='"+(3+captx.length)+"'><BR><FONT FACE='lucida sans, Gillsans mt,frutiger,helvetica,geneva,arial' COLOR='#0066CC' SIZE='1'>&copy; 2002 www.WINDPOWER.org</FONT></TD></TR>");
	win2.document.write("</TABLE></BODY></HTML>");
	win2.document.close();
}
Array.prototype.draw=draw;
function plot(){
	if (gData.length<10){
		alert("Your cannot use the plot facility unless you have done at least 10 tests with different values to plot.");
	}else{
		var foc=null;
		if (document.layers){
			foc=document.layers.logc.document.forms[0].elements;
		}else{
			foc=document.forms[1].elements;
		}
		var help=new Array();
		var x=foc.x.options[foc.x.selectedIndex].value;
		var y=foc.y.options[foc.y.selectedIndex].value;
		for (var i=0;i<gData.length;i++){
			help[i]=new Array(gData[i][x],gData[i][y]);
		}
		var dataNames=new Array("F<SUB>L</SUB>","c<SUB>D</SUB>","v<SUB>T</SUB>","v<SUB>P</SUB>","&lambda;","P","c<SUB>P</SUB>");
		var size=parseInt(foc.size.options[foc.size.selectedIndex].value);
		help.draw(size,size,"",dataNames[x],dataNames[y]);
	}
}
function sort(n){
	n--;
	if (n<0) return;
	var s=new Function("return(arguments[0]["+n+"]-arguments[1]["+n+"])");
	gData=gData.sort(s);
	listData();
}
function deleteLog(){
	if (!confirm("Are you sure you want to delete all your test results?")) return;
	gData=new Array();
	listData();
}
function d(n){ // Delete from data array
	var r=new Array();
	for (var i=0;i<n;i++){r[i]=gData[i];}
	for (var i=n+1;i<gData.length;i++){r[i-1]=gData[i];}
	gData=r;
	listData();
}