/************************************************************
var lngContentWidth = 750;
function getPos(){
	var lngAdjust = 0;
	var lngClientWidth = document.body.clientWidth
	var lngCenterPixel = lngClientWidth / 2 
	if (lngClientWidth > 750){
		lngStartPoint = Math.ceil(lngCenterPixel - (lngContentWidth / 2))
		if(bw.mac){
			if(bw.safari) {
				lngAdjust = -1;
			}
		} else {
			if(bw.ie){
				lngAdjust = -1;
			}
		}
		return lngStartPoint + lngAdjust;
	} else {
		lngStartPoint = Math.ceil(0)
		return lngStartPoint + lngAdjust;
	}
}