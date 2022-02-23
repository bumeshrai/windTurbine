// Copyright 2003 Danish Wind Industry Association
// globals
var ijLanguages=new Array("da","de","en","es","fr","fi"); // language codes
var ijLanguage; // Current language code
var ijLanguageNo; // Cuurrent language number
var ijActive=0; // no. of active pages
var ijCD=false; // Is this the cd version? Gives hard links to movies from the web hotel, if set to false

initializeTable();

function initializeTable(){
	var metas=document.getElementsByTagName("meta");
	for (var i=0;i<metas.length;i++){
		if (metas[i].name.toLowerCase()=="content-language"){
			ijLanguage=metas[i].content.toLowerCase().substring(0,2);
			break;
		}
	}
	for (var i=0;i<ijLanguages.length;i++){
		if (ijLanguages[i]==ijLanguage){
			ijLangNo=i;
			break;
		}
	}
}

function map(parent,url,da,de,en,es,fr,fi,urlCD){ // map object
		this.parent=parent;
		this.name=arguments[ijLangNo+2];
		this.url=url;
		if (urlCD){
			if (ijCD) this.url=urlCD;
		}
		this.children=new Array();
		if (this.parent!=null) this.parent.children[this.parent.children.length]=this;
		if (this.name.charAt(0)!="-"){ this.no=ijActive; ijActive++; }
}
// Table contents:
// Parent object
// URL of page. If pages does not exist in ANY language it is only a node point, then put a unique dummy name in there, e.g. a name followed by ".xxx". Otherwise the page cannoot be identified.
// Name of page in da, de, en, es, fr, fi
// If name is only "-" then the page does not exist in that language, and the entry will not be shown in the site map
// If name is "-more text", i.e. a text beginning with "-", then the page does not exist in any language, but the chapter heading will be shown in all languages with an arrow ahead.
// next operand is optional. It is the cd url, if different from the other versions, which usually have hard links for video files.

var ijDomain=new map(null,"index.htm","-","-","-","-","-","-");
		var ijSite=new map(ijDomain,"core.htm","Hjem","Home","Home","Inicio","Accueil","-FI");
			var ijTour=new map(ijSite,"tour.xxx","-Rundtur","-Streifzug","-Guided tour","-Visita guiada","-Visite guid&eacute;e","-FI");
//				new map(ijTour,"tour/index.htm","Indledning","Einf&uuml;hrung","Introduction","Introducci&oacute;n","Introduction","-FI");
				var ijWres=new map(ijTour,"wres.xxx","-Vind","-Wind","-Wind","-Recursos e&oacute;licos","-La ressource &eacute;olienne","-FI");
					new map(ijWres,"tour/wres/index.htm","Hvorfra vindenergi?","Woher Windenergie?","Whence wind?","De d&oacute;nde energ&iacute;a e&oacute;lica?","D'o&ugrave; l'&eacute;nergie &eacute;olienne?","-FI");
					new map(ijWres,"tour/wres/coriolis.htm","Corioliskraften","Corioliskraft","The Coriolis force","La fuerza de Coriolis","La force de Coriolis","-FI");
					new map(ijWres,"tour/wres/globwin.htm","Globale vinde","Globale Winde","Global winds","Los vientos globales","Les vents globaux","-FI");
					new map(ijWres,"tour/wres/geostro.htm","Geostrofisk vind","Geostrophischer Wind","Geostrophic wind","Los vientos geostr&oacute;ficos","Les vents g&eacute;ostrophiques","-FI");
					new map(ijWres,"tour/wres/localwin.htm","Lokale vinde","Lokale Winde","Local winds","Los vientos locales","Les vents locaux","-FI");
					new map(ijWres,"tour/wres/mount.htm","Bjergvinde","Bergwinde","Mountain winds","Los vientos de monta&ntilde;a","Les vents de montagne","-FI");
					new map(ijWres,"tour/wres/enerwind.htm","Vindens energi","Energie im Wind","Energy in the wind","La energ&iacute;a en el viento","L'&eacute;nergie du vent","-FI");
					new map(ijWres,"tour/wres/tube.htm","Vinden afb&oslash;jes","Windablenkung","Wind deflection","La desviaci&oacute;n del viento","Le d&eacute;tournement du vent","-FI");
					new map(ijWres,"tour/wres/enrspeed.htm","Vindhast.&amp;energi","Geschwindigkeit&amp;Energie","Wind speeds &amp; energy","La velocidad y potencia","Vitesse et &eacute;nergie","-FI");
					new map(ijWres,"tour/wres/wndspeed.htm","Anemometre","Anemometer","Anemometers","Los anem&oacute;metros","Les an&eacute;mom&egrave;tres","-FI");
					new map(ijWres,"tour/wres/wndsprac.htm","M&aring;ling i praksis","Messung in der Praxis","Measurement in practice","Mediciones en la pr&aacute;ctica","Mesurer dans la pratique","-FI");
					new map(ijWres,"tour/wres/rose.htm","Vindrosen","Windrose","The wind rose","La rosa de los vientos","La rose des vents","-FI");
					new map(ijWres,"tour/wres/roseplot.htm","Tegn en vindrose","Windrosen-Plotter","Draw a wind rose","Programa trazador","Tracez la rose des vents","-FI");
				var ijPlac=new map(ijTour,"plac.xxx","-Placering","-Standortwahl","-Turbine siting","-Emplazamiento","-Choix d'un site","-FI");
					new map(ijPlac,"tour/wres/shear.htm","Ruhed &amp; vindgradient","Rauhigkeit &amp; Scherung","Roughness &amp; shear","Rugosidad y cizallamiento","Rugosit&eacute; et cisaillement","-FI");
					new map(ijPlac,"tour/wres/calculat.htm","Beregn vindhastighed","Windscherungs-Calculator","Speed calculation","C&aacute;lculo de la velocidad","Calculatrice de la vitesse","-FI");
					new map(ijPlac,"tour/wres/escarp.htm","Skr&aelig;nter","Scherung&amp;B&ouml;schungen","Escarpments","Escarpas","Escarpements","-FI");
					new map(ijPlac,"tour/wres/rrose.htm","Ruhedsrosen","Rauhigkeitsrose","The roughness rose","La rosa de rugosidad","La rose des rugosit&eacute;s","-FI");
					new map(ijPlac,"tour/wres/variab.htm","Var. vindhastigheder","Windschwankungen","Variable winds","Variabilidad del viento","Variations de la vitesse","-FI");
					new map(ijPlac,"tour/wres/turb.htm","Turbulens","Turbulenzen","Turbulence","Turbulencia","La turbulence","-FI");
					new map(ijPlac,"tour/wres/obst.htm","L&aelig;givere","Hindernisse im Wind","Wind obstacles","Obst&aacute;culos del viento","Les obstacles au vent","-FI");
					new map(ijPlac,"tour/wres/shade.htm","L&aelig;virkning","Windschatten","Wind shade","Abrigo del viento","Effet d'abri (obstacle)","-FI");
					new map(ijPlac,"tour/wres/shelter/guides.htm","Vejl. i l&aelig;virkning","Calculator-Hinweise","Calculator guide","Gu&iacute;a para el programa","Guide du programme","-FI");
					new map(ijPlac,"tour/wres/shelter/index.htm","Beregn l&aelig;virkning","Windschatten-Calculator","Shade calculator","C&aacute;lculo del abrigo","Calculez l'effet d'obstacle","-FI");
					new map(ijPlac,"tour/wres/wake.htm","K&oslash;lvandseffekt","Nachlauf-Effekt","Wake","Efecto de la estela","L'effet de sillage","-FI");
					new map(ijPlac,"tour/wres/park.htm","Parkeffekt","Park-Effekt","The park effect","El efecto del parque","L'effet de parc","-FI");
					new map(ijPlac,"tour/wres/speedup.htm","Tunneleffekt","Tunnel-Effekt","The tunnel effect","El efecto t&uacute;nel","L'effet de tunnel","-FI");
					new map(ijPlac,"tour/wres/hill.htm","Bakkeeffekt","H&uuml;gel-Effekt","The hill effect","Efecto de la colina","L'effet de colline","-FI");
					new map(ijPlac,"tour/wres/siting.htm","Placering","Standortwahl","Turbine siting","Emplazamiento","Choix d'un site &eacute;olien","-FI");
					new map(ijPlac,"tour/wres/offshore.htm","Vind til havs","Windbedingungen im Meer","Offshore winds","Condiciones marinas","Les vents sur la mer","-FI");
					new map(ijPlac,"tour/wres/euromap.htm","Vindkort Europa","Windkarte Europa","Wind map Europe","Mapa e&oacutelico de Europa","Les vents de l'Europe","-FI");
					new map(ijPlac,"tour/wres/dkmap.htm","Vindkort Danmark","Windkarte D&auml;nemark","Wind map Denmark","Mapa e&oacutelico de Dinamarca","Les vents du Danemark","-FI");
				var ijProd=new map(ijTour,"prod.xxx","-Energiproduktion","-Energieproduktion","-Energy output","-Energ&iacute;a producida","-Production &eacute;nerg&eacute;tique","-FI");
					new map(ijProd,"tour/wres/weibull.htm","Weibullfordelingen","Weibull-Verteilung","The Weibull distribution","La distribuci&oacute;n Weibull","La distribution Weibull","-FI");
					new map(ijProd,"tour/wres/weibull/index.htm","Plot af fordelingen","Verteilung zeichnen","Distribution plotting","Trazador de la distribuci&oacute;n","Tra&ccedil;age de la distibution","-FI");
					new map(ijProd,"tour/wres/bottle.htm","Fejlslutninger","Fehlschl&uuml;sse","The average bottle fallacy","La botela promedio","La bouteille moyenne","-FI");
					new map(ijProd,"tour/wres/shelves.htm","Vindens middeleffekt","Mittlere Leistung","Mean power of the wind","Potencia media del viento","La puissance moyenne","-FI");
					new map(ijProd,"tour/wres/betz.htm","Betz lov","Betz'sches Gesetz","Betz' law","La ley de Betz","La loi de Betz","-FI");
					new map(ijProd,"tour/wres/powdensi.htm","Effektt&aelig;thed","Leistungsdichtefunktion","Power density","La densidad de potencia","La densit&eacute; de puissance","-FI");
					new map(ijProd,"tour/wres/pwr.htm","Effektkurver","Leistungskurven","Power curves","La curva de potencia","La courbe de puissance","-FI");
					new map(ijProd,"tour/wres/cp.htm","Effektkoefficienten","Leistungsbeiwert","The power coefficient","La coefiente de potencia","Coefficient de puissance","-FI");
					new map(ijProd,"tour/wres/guidep.htm","Vejl. i energiberegning","Calculator-Hinweise","Calculator guide","Gu&iacute;a para el programa","Guide du programme","-FI");
					new map(ijProd,"tour/wres/pow/index.htm","Energiberegning","Leistungs-Calculator","The power calculator","Calculador de potencia","Calculatrice de puissance","-FI");
					new map(ijProd,"tour/wres/annu.htm","&Aring;rlig produktion","J&auml;hrliche Produktion","Annual energy output","Energ&iacute;a anual disponible","Production annuelle","-FI");
				var ijWtrb=new map(ijTour,"wtrb.xxx","-Hvordan virker m&oslash;ller?","-WKA-Funktionsweise","-How does it work?","-&iquest;C&oacute;mo funciona?","-Fonctionnement","-FI");
					new map(ijWtrb,"tour/wtrb/comp/index.htm","Komponenter","Bestandteile","Components","Componentes","Composants","-FI");
					new map(ijWtrb,"tour/wtrb/lift.htm","Opdrift","Auftrieb","Lift","Sustentaci&oacute;n","La portance","-FI");
					new map(ijWtrb,"tour/wtrb/stall.htm","Stall og drag","Stall und Luftwiderstand","Stall and drag","P&eacute;rdida y Resistencia","D&eacute;crochage et tra&icirc;n&ecirc;e","-FI");
					new map(ijWtrb,"tour/wtrb/aerodyn2.htm","Sum af vindhastigheder","Addition von Geschwind.","Sum of wind speeds","Suma de velocidades","Somme des vitesses","-FI");
					new map(ijWtrb,"tour/wtrb/rotor.htm","Rotorens aerodynamik","Aerodynamik des Rotors","Rotor aerodynamics","Aerodin&aacute;mica del rotor","A&eacute;rodynamique du rotor","-FI");
					new map(ijWtrb,"tour/wtrb/blades.htm","Rotorblade","Rotorbl&auml;tter","Rotor blades","Palas del rotor","Les pales du rotor","-FI");
					new map(ijWtrb,"tour/wtrb/powerreg.htm","Effektregulering","Leistungsregelung","Power control","Control de potencia","Contr&ocirc;le de la puissance","-FI");
					new map(ijWtrb,"tour/wtrb/yaw.htm","Kr&oslash;jemekanisme","Nachf&uuml;hrmechanismus","The yaw mechanism","Mecanismo de orientaci&oacute;n","Disp. de orientation","-FI");
					new map(ijWtrb,"tour/wtrb/tower.htm","T&aring;rne","T&uuml;rme","Towers","Torres","Tours","-FI");
					new map(ijWtrb,"tour/wtrb/size.htm","Vindm&oslash;llers st&oslash;rrelse","Gr&ouml;&szlig;e von WKA","The size of turbines","Tama&ntilde;o de turbinas","Taille des &eacute;oliennes","-FI");
					new map(ijWtrb,"tour/wtrb/safety.htm","Sikkerhedshensyn","Sicherheit von WKA","Turbine Safety","Seguridad en turbinas","S&eacute;curit&eacute;","-FI");
					new map(ijWtrb,"tour/wtrb/safety2.htm","Arbejdssikkerhed","Betriebssicherheit","Labour safety","Seguridad en el trabajo","S&eacute;curit&eacute; du travail","-FI");
				var ijGene=new map(ijTour,"gene.xxx","-Generatorer","-Generatoren","-Generators","-Generadores","-G&eacute;n&eacute;ratrices","-FI");
					new map(ijGene,"tour/wtrb/electric.htm","Generatorer","Generatoren","Generators","Generadores","G&eacute;n&eacute;ratrices","-FI");
					new map(ijGene,"tour/wtrb/syncgen.htm","Synkrongeneratorer","Synchrongeneratoren","Synchronous machines","Generadores s&iacute;ncronos","G&eacute;n&eacute;ratrices synchrones","-FI");
					new map(ijGene,"tour/wtrb/genpoles.htm","Poltal","Polzahlen","No. of poles","No. de polos","No. de p&ocirc;les","-FI");
					new map(ijGene,"tour/wtrb/async.htm","Asynkronmaskiner","Asynchrongeneratoren","Asynchronous machines","Generadores as&iacute;ncronos","G&eacute;n&eacute;ratrices asynchrones","-FI");
					new map(ijGene,"tour/wtrb/stator.htm","&AElig;ndring i poltal","&Auml;ndern der Polzahl","Changing no. of poles","Cambio de no. de polos","Nombre de p&ocirc;les","-FI");
					new map(ijGene,"tour/wtrb/varislip.htm","Variabelt slip","Variabler Schlupf","Variable slip","Deslizamiento variable","Glissement variable","-FI");
					new map(ijGene,"tour/wtrb/indirect.htm","Indirekte nettilslutning","Indirekte Netzanbindung","Indirect grid connection","Conexi&oacute;n indirecta a red","Raccordement indirect","-FI");
					new map(ijGene,"tour/wtrb/powtrain.htm","Gearkasser","Getriebe","Gearboxes","Cajas multiplicadoras","Les mulitplicateurs","-FI");
					new map(ijGene,"tour/wtrb/control.htm","Styringer","Regler","Controllers","El controlador electr&oacute;nico","Contr&ocirc;le-commande","-FI");
					new map(ijGene,"tour/wtrb/control2.htm","Str&oslash;mkvalitet","Leistungsqualit&auml;t","Power quality","Calidad de potencia","Qualit&eacute;de puissance","-FI");
				var ijDesii=new map(ijTour,"desi.xxx","-M&oslash;lledesign","-Design","-Turbine design","-Dise&ntilde;o de turbinas","-Conception","-FI");
					new map(ijDesii,"tour/design/index.htm","Lastovervejelser","Belastung","Load considerations","Consideraciones de carga","Charges","-FI");
					new map(ijDesii,"tour/design/horver.htm","Horisontal/vertikal","Achslage","Horizontal/vertical","Horizontal/vertical","Horizontal/vertical","-FI");
					new map(ijDesii,"tour/design/updown.htm","Forl&oslash;ber/bagl&oslash;ber","Luvl&auml;ufer/Leel&auml;ufer","Upwind/downwind","Barlovento/sotavento","Face au vent/sous le v.","-FI");
					new map(ijDesii,"tour/design/concepts.htm","Antal rotorblade","Wieviele Rotorbl&auml;tter?","No. of rotor blades","&iquest;Cuantas palas?","Combien de pales ?","-FI");
					new map(ijDesii,"tour/design/optim.htm","Optimering af m&oslash;ller","Optimierung von WKA","Optimising turbines","Optimizaci&oacute;n","Optimisation","-FI");
					new map(ijDesii,"tour/design/quietma.htm","Lav mekanisk st&oslash;j","Mechanischer Schall","Low mechanical noise","Bajo ruido mec&aacute;nico","Bruit m&eacute;canique","-FI");
					new map(ijDesii,"tour/design/quietae.htm","Lav aerodynamisk st&oslash;j","Aerodynamischer Schall","Low aerodynamic noise","Bajo ruido aerodin&aacute;mico","Bruit a&eacute;rodynamique","-FI");
				var ijManu=new map(ijTour,"manu.xxx","-Fremstilling","-Herstellung","-Manufacturing","-Fabricaci&oacute;n","-Fabrication","-FI");
					new map(ijManu,"tour/manu/index.htm","Naceller","Gondeln","Nacelles","G&oacute;ndolas","Nacelles","-FI");
					new map(ijManu,"tour/manu/bladtest.htm","Vingeafpr&oslash;vning","Rotorblatt Tests","Blade testing","Probando palas","Essais des pales","-FI");
					new map(ijManu,"tour/manu/towerm.htm","T&aring;rne","T&uuml;rme","Towers","Torres","Tours des &eacute;oliennes","-FI");
					new map(ijManu,"tour/manu/towerwld.htm","Svejsning af t&aring;rne","Schwei&szlig;en von T&uuml;rmen","Welding towers","Soldeo de torres","Soudage des tours","-FI");
					new map(ijManu,"tour/manu/towrassy.htm","Installering af t&aring;rne","Installation von T&uuml;rmen","Installing towers","Instalaci&oacute;n de torres","Installation des tours","-FI");
					new map(ijManu,"tour/manu/foundoff.htm","Offshorefundamenter","Fundamente Offshore","Offshore foundations","-","-","-");
				var ijRdad=new map(ijTour,"rdad.xxx","-Forskning &amp; udvikling","-Forschung &amp; Entwicklung","-R &amp; D","-Investigaci&oacute;n y desarollo","-Recherche &amp; D","-FI");
					new map(ijRdad,"tour/rd/index.htm","Forskning og udvikling","Forschung&amp;Entwicklung","R &amp; D in wind","Investigaci&oacute; y desarrollo","R &amp; D &eacute;olien","-FI");
					new map(ijRdad,"tour/rd/offintro.htm","Forskning i havm&oslash;ller","Forschung Offshore","Research in offshore","Investigaci&oacute;n marina","R &amp; D offshore","-FI");
					new map(ijRdad,"tour/rd/foundat.htm","Fundamenter til havs","Fundamente Offshore","Foundations at sea","Cimentaciones marinas","Fondations marines","-FI");
					new map(ijRdad,"tour/rd/concrete.htm","Betons&aelig;nkekasse","Betonsenkkasten","Concrete caissons","De hormigon","Le caisson de b&eacute;ton","-FI");
					new map(ijRdad,"tour/rd/gravitat.htm","St&aring;ls&aelig;nkekasse","Stahlsenkkasten","Steel gravitaty foundations","De gravedad+acero","Le caisson d'acier","-FI");
					new map(ijRdad,"tour/rd/monopile.htm","Enkeltp&aelig;l","Stahlpfeiler","Monopile foundations","El monopilote","Le mono-pilot d'acier","-FI");
					new map(ijRdad,"tour/rd/tripod.htm","Trebensfundament","Dreibein","Tripod foundations","El tripode","Le tr&eacute;pied","-FI");
				var ijGrid=new map(ijTour,"grid.xxx","-Elnet","-Anlagen am Netz","-Electrical grid","-La red el&eacute;ctrica","-R&eacute;seau &eacute;lectrique","-FI");
					new map(ijGrid,"tour/grid/index.htm","Variationer i energi","Energieschwankungen","Variations in energy","Variaciones en energ&iacute;a","Variations en &eacute;nergie","-FI");
					new map(ijGrid,"tour/grid/season.htm","&Aring;rstidsvaritioner","Saisonschwankungen","Seasonal variations","Variaci&oacute;n estacional","Variations saisonni&egrave;res","-FI");
					new map(ijGrid,"tour/grid/rein.htm","Str&oslash;mkvalitet","Leistungsqualit&auml;t","Power quality","Calidad de potencia","Qualit&eacute; de puissance","-FI");
					new map(ijGrid,"tour/grid/offshore.htm","Havm&oslash;ller og elnet","Offshore und Netz","Offshore wind and grid","Parques marinas y la red","Offshore et le r&eacute;seau","-FI");
				var ijEnvi=new map(ijTour,"envi.xxx","-Milj&oslash;","-Umwelt","-Environment","-El medio ambiente","-Environnement","-FI");
					new map(ijEnvi,"tour/env/index.htm","Landskab","Landschaft","Landscape and turbines","Turbinas y el paisaje","Insertion paysag&egrave;re","-FI");
					new map(ijEnvi,"tour/env/airmark.htm","Flyafm&aelig;rkning","Markierung","Aerial markings","Balizamiento","Balisage","-FI");
					new map(ijEnvi,"tour/env/sound.htm","Lyd fra vindm&oslash;ller","Schallentwicklung","Sound from turbines","Sonido en turbinas","Emissions sonores","-FI");
					new map(ijEnvi,"tour/env/db/dbdef.htm","M&aring;ling af lyd","Schallmessung","Sound measurement","Medici&oacute;n de sonido","Mesure et calcul sonore","-FI");
					new map(ijEnvi,"tour/env/db/dbcalc.htm","Lydkortregneark","Schallpegelkarten","Sound map calculator","Calculador de sonido 1","Tracez une carte sonore","-FI");
					new map(ijEnvi,"tour/env/db/db2calc.htm","Lydberegningsprogram","Schall-Calculator","Sound calculator","Calculador de sonido 2","Calculatrice sonore","-FI");
					new map(ijEnvi,"tour/env/enpaybk.htm","Energibalance","Energiebilanz","Energy balance","El balance de energ&iacute;a","Bilan &eacute;nerg&eacute;tique","-FI");
					new map(ijEnvi,"tour/env/birds.htm","Fugle og vindm&oslash;ller","V&ouml;gel und WKA","Birds and wind turbines","Aves y turbinas","Eoliennes et l'avifaune","-FI");
					new map(ijEnvi,"tour/env/birdsoff.htm","Havm&oslash;ller og fugleliv","V&ouml;gel &amp; Offshore","Birds and offshore wind","Aves y turbinas marinas","L'avifaune marine","-FI");
					new map(ijEnvi,"tour/env/shadow/index.htm","Skyggekast","Schatten von WKA","Shadow casting","Proyecci&oacute;n de sombras","Projection d'ombres","-FI");
					new map(ijEnvi,"tour/env/shadow/shadow.htm","Beregning af skygger","Schattenberechnung 1","Shadow calculation","C&aacutelculo de sombras","Calcul des ombres","-FI");
					new map(ijEnvi,"tour/env/shadow/shadowr.htm","Bedre beregninger","Schattenberechnung 2","Better calculations","Mejores c&aacutelculos","Calculs plus pr&eacute;cises","-FI");
					new map(ijEnvi,"tour/env/shadow/shadow2.htm","Skyggevariationer","Schattenverlauf","Shadow variations","Variaciones de sombra","Variations des ombres","-FI");
					new map(ijEnvi,"tour/env/shadow/guide.htm","Vejledning i program","Calculator-Hinweise","Guide to calculator","Gu&iacute;a al calculador","Guide du programme","-FI");
					new map(ijEnvi,"tour/env/shadow/shadowc.htm","Skyggekastprogram","Schatten-Calculator","Shadow calculator","Calculador de sombra","Calculatrice des ombres","-FI");
				var ijEcon=new map(ijTour,"econ.xxx","-&Oslash;konomi","-Wirtschaftlichkeit","-Economics","-Econom&iacute;a","-Rentabilit&eacute;","-FI");
					new map(ijEcon,"tour/econ/index.htm","Hvad koster en m&oslash;lle?","Was kostet eine WKA?","Turbine costs","&iquest;Cu&aacutento cuesta?","Prix des &eacute;oliennes","-FI");
					new map(ijEcon,"tour/econ/install.htm","Installation","Installation","Turbine installation","Instalaci&oacute;n","Co&ucirc;ts d'installation","-FI");
					new map(ijEcon,"tour/econ/oandm.htm","Drift og vedligehold","Betrieb und Wartung","O &amp; M","Costes de operaci&oacute;n","Co&ucirc;ts d'exploitation","-FI");
					new map(ijEcon,"tour/econ/income.htm","Indkomst fra vindenergi","Einnahmen aus WKA","Income from wind energy","Ingresos","Revenus","-FI");
					new map(ijEcon,"tour/econ/tariffs.htm","Elpriser","Stromtarife","Tariffs","Tarifas","Tarifs &eacute;lectriques","-FI");
					new map(ijEcon,"tour/econ/basic.htm","Investering i vindkraft","Investitionen","Investment in wind power","Inversiones","Investissement","-FI");
					new map(ijEcon,"tour/econ/economic.htm","&Oslash;konomien i vindenergi","Wirtschaftlichkeit","Economics of wind energy","Aspectos econ&oacute;micos","Rentabili&eacute;","-FI");
					new map(ijEcon,"tour/econ/pitfalls.htm","F&aelig;lder i analyser","Fallen bei der Analyse","Traps in analyses","Errores y fallos","Pi&egrave;ges dans l'analyse","-FI");
					new map(ijEcon,"tour/econ/guide.htm","Vejledning til beregning","Calculator-Hinweise","Guide to the calculator","Gu&iacute;a al calculador","Guide du programme","-FI");
					new map(ijEcon,"tour/econ/econ.htm","&Oslash;konomiregneark","Calculator","Economics calculator","Calculador de econom&iacute;a","Calculatrice/rentabilit&eacute;","-FI");
					new map(ijEcon,"tour/econ/offshore.htm","&Oslash;konomi i havvindkraft","Offshore","Economics of offshore wind","Turbinas marinas","Rentabilit&eacute; offshore","-FI");
					new map(ijEcon,"tour/econ/empl.htm","Besk&aelig;ftigelse","Besch&auml;ftigung","Employment","Empleo","Emploi industriel","-FI");
				var ijHist=new map(ijTour,"hist.xxx","-Vindkraftens historie","-Geschichte","-History of wind energy","-Historia","-Petit historique","-FI");
					new map(ijHist,"pictures/index.htm","Indledning","Einf&uuml;hrung","Introduction","Introducci&oacute;n","Introduction","-FI");
					new map(ijHist,"pictures/brush.htm","Charles F. Brush","Charles F. Brush","Charles F. Brush","Charles F. Brush","Charles F. Brush","-FI");
					new map(ijHist,"pictures/lacour.htm","Poul la Cour","Poul la Cour","Poul la Cour","Poul la Cour","Poul la Cour","Poul la Cour");
					new map(ijHist,"pictures/fifties.htm","1940-1956","1940-1956","1940-1956","1940-1956","1940-1956","-FI");
					new map(ijHist,"pictures/juul.htm","Johannes Juul","Johannes Juul","Johannes Juul","Johannes Juul","Johannes Juul","Johannes Juul");
					new map(ijHist,"pictures/eighties.htm","1980erne","1980er Jahre","1980s","A partir de los 1980s","Des ann&eacute;es 1980","-FI");
					new map(ijHist,"pictures/windrush.htm","Den store vindfeber","Windrausch","The great wind rush","El gran torriente e&oacute;lico","La course californienne","-FI");
					new map(ijHist,"pictures/modern.htm","Moderne vindm&oslash;ller","Moderne WKA","Modern wind turbines","Turbinas modernos","Les &eacute;oliennes modernes","-FI");
					new map(ijHist,"pictures/offshore.htm","Havvindm&oslash;ller","Offshore-WKA","Offshore wind turbines","Turbinas marinos","Eoliennes en mer","-FI");
					new map(ijHist,"pictures/mega.htm","Megawattm&oslash;ller","Megawatt-WKA","Megawatt turbines","Turbinas megavatios","La classe du megawatt","-FI");
					new map(ijHist,"pictures/multimeg.htm","MultiMWm&oslash;ller","Multimegawatt-WKA","Multi mega machines","Multi mega maquinas","Classe multi-megawatt","-FI");
			var ijRefe=new map(ijTour,"refe.xxx","-Vindkrafth&aring;ndbog","-Windkraft-Handbuch","-Wind energy manual","-Manual de referencia","-Manuel de r&eacute;f&eacute;rence","-FI");
				new map(ijRefe,"stat/units.htm","Indeks","Index","Index","&Iacute;ndice","Index","-FI");
				new map(ijRefe,"stat/unitsw.htm","Vindenergibegreber","Windenergieparameter","Wind energy concepts","Energ&iacute;a e&oacutelica","Concepts &eacute;oliens","-FI");
				new map(ijRefe,"stat/unitsene.htm","Energi og effekt","Energie und Leistung","Energy and power","Energ&iacute;a y potencia","Energie et puissance","-FI");
				new map(ijRefe,"stat/betzpro.htm","Bevis for Betz' lov","Betz'sches Gesetz","Proof of Betz' law","La ley de Betz","Preuve de la loi de Betz","-FI");
				new map(ijRefe,"stat/unitssnd.htm","Vindm&oslash;ller og akustik","WKA und Akustik","Wind turbine acoustics","Ac&uacutestica","Acoustique","-FI");
				new map(ijRefe,"stat/unitsac.htm","Elektricitet","Elektrizit&auml;t","Electricity","Electricidad","Electtriciit&eacute;","-FI");
				new map(ijRefe,"stat/unitsac3.htm","3-faset vekselstr&oslash;m","3-Phasen-Wechselstrom","3 phased electricity","Corriente alterna trif&aacute;sica","Courant triphas&eacute;","-FI");
				new map(ijRefe,"stat/unitac3c.htm","Tilslutn. til 3 faser","3-Phasen Anschlu&szlig;","3 phased connection","Conexi&oacute;n trif&aacute;sica","Connexion triphas&eacute;","-FI");
				new map(ijRefe,"stat/emag/index.htm","Elektromagnetisme 1","Elektromagnetismus 1","Electromagnetism 1","Electromagnetismo 1","Electromagn&eacute;tisme 1","-FI");
				new map(ijRefe,"stat/emag/emagn.htm","Elektromagnetisme 2","Elektromagnetismus 2","Electromagnetism 2","Electromagnetismo 2","Electromagn&eacute;tisme 2","-FI");
				new map(ijRefe,"stat/emag/induct1.htm","Induktion 1","Induktion 1","Induction 1","Inducci&oacute;n 1","Induction 1","-FI");
				new map(ijRefe,"stat/emag/induct2.htm","Induktion 2","Induktion 2","Induction 2","Inducci&oacute;n 2","Induction 2","-FI");
				new map(ijRefe,"stat/unitsenv.htm","Milj&oslash; og br&aelig;ndsler","Umwelt und Energietr&auml;ger","Environment and fuels","Ambiente y combustibles","Combustibles","-FI");
				new map(ijRefe,"stat/biblio.htm","Litteraturliste","Literaturverzeichnis","Bibliography","Bibliograf&iacute;a","Bibliographie &eacute;olienne","-FI");
				new map(ijRefe,"glossary.htm","Ordbog","Glossar","Glossary","Glosario","Glossaire &eacute;olien","-FI");
//			new map(ijTour,"quiz/index.htm","Quiz","Windenergie-Quiz","Wind energy quiz","Test","Testez-vous","-FI");
			var ijFaqs=new map(ijSite,"faqs.htm","-","-","-","-","-","-FI");
//						 new map(ijSite,"news/webcam.htm","-","Webkamera","Web cam","Web cam","Cam&eacute;ra Web","-FI");
//			var ijNews=new map(ijSite,"news.xxx","-","-","-","-","-","-FI");
//				var ijNe04=new map(ijNews,"news2004.xxx","-Nyheder 2004","-","-News 2004","-","-","-FI");
//					new map(ijNe04,"news/index.htm","-","News","News","Noticias","Actualit&eacute;s","-FI");
//					new map(ijNe04,"news/mdl2004.htm","-","-","-","-","-","-");
//					new map(ijNe04,"news/aarsmoede04.htm","-","-","-","-","-","-");
//				var ijNe03=new map(ijNews,"news2003.xxx","-","-News 2002-2003","-News 2003","-Noticias 2003","-Actualit&eacute;s 2003","-FI");
//					new map(ijNe03,"news/arch2003.htm","-","News","News","Noticias","Actualit&eacute;s","-FI");
//					new map(ijNe03,"news/stat2002.htm","-","-","Statistics for 2002","-","-","-FI");
//					new map(ijNe03,"news/netsvar.htm","-","-","-","-","-","-FI");
//					new map(ijNe03,"news/offshore.htm","-","-","-","-","-","-FI");
//					new map(ijNe03,"news/krystalk.htm","-","-","-","-","-","-FI");
//					new map(ijNe03,"news/kulkraft.htm","-","-","-","-","-","-FI");
//				var ijNe02=new map(ijNews,"news2002.xxx","-","-","-News 2002","-","-","-FI");
//					new map(ijNe02,"news/arch2002.htm","-","-","News","-","-","-");
//					new map(ijNe02,"news/stat2001.htm","-","Statistiken 2001","Statistics for 2001","-","-","-");
//					new map(ijNe02,"news/visnar.htm","-","-","Questionable wisdom","-","-","-");
//					new map(ijNe02,"news/mdl2002.htm","-","-","-","-","-","-");
//					new map(ijNe02,"news/plat.htm","-","-","-","-","-","-");
//					new map(ijNe02,"news/bendtben.htm","-","-","-","-","-","-")
//				var ijNe01=new map(ijNews,"news2001.xxx","-","-","-News 2001","-","-","-FI");
//					new map(ijNe01,"news/arch2001.htm","-","-","News","-","-","-");
//					new map(ijNe01,"news/wpmlettr.htm","-","-","Green certificates die","-","-","-");
//					new map(ijNe01,"news/swedish.htm","-","-","Swedish green certif.","-","-","-");
//					new map(ijNe01,"news/regkunst.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/overloeb.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/thor.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/onice.htm","-","Zertifikaten auf Eis","-","-","-","-");
//					new map(ijNe01,"news/reformgr.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/stat2000.htm","-","-","Statistics for 2000","-","-","-");
//					new map(ijNe01,"news/ckkronik.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/seals.htm","-","-","Seals and turbines","-","-","-");
//					new map(ijNe01,"news/sea.htm","-","-","-","-","-","-");
//					new map(ijNe01,"news/webstat.htm","-","Webstatistiken","Web statistics","-","-","-");
//					new map(ijNe01,"news/math.htm","-","-","-","-","-","-");
//				var ijNe00=new map(ijNews,"news2000.xxx","-","-News 2000-2001","-News 2000","-","-","-");
//					new map(ijNe00,"news/arch2000.htm","-","News","News","-","-","-");
//					new map(ijNe00,"news/wast.htm","-","-","-","-","-","-");
//					new map(ijNe00,"news/kronik.htm","-","-","-","-","-","-");
//					new map(ijNe00,"news/leder.htm","-","-","-","-","-","-");
//					new map(ijNe00,"news/stat1999.htm","-","-","Statistics for 1999","-","-","-");
//					new map(ijNe00,"news/debat.htm","-","-","-","-","-","-");
//					new map(ijNe00,"news/certif00.htm","-","-","-","-","-","-");
//				var ijNe99=new map(ijNews,"news1999.xxx","-","-","-News 1999","-","-","-");
//					new map(ijNe99,"news/arch1999.htm","-","-","News","-","-","-");
//					new map(ijNe99,"news/elreform.htm","-","-","Guarded optimism","-","-","-");
//					new map(ijNe99,"news/eu98.htm","-","-","EU directive on RE","-","-","-");
//					new map(ijNe99,"news/trusler.htm","-","-","-","-","-","-");
//					new map(ijNe99,"news/pwc.htm","-","-","-","-","-","-");
//					new map(ijNe99,"news/check.htm","-","-","-","-","-","-");
//				new map(ijNews,"news/arch1998.htm","-","News 1998-99","News 1998","-","-","-");
//				new map(ijNews,"news/arch1997.htm","-","-","News 1997","-","-","-");
//			var ijPubl=new map(ijSite,"publ.xxx","-","-","-","-","-","-FI");
//				new map(ijPubl,"publ/index.htm","","Publikationen","Publications list","Publicaciones","Publications","-FI");
//				new map(ijPubl,"articles/energypo.htm","-","-","Energy policy in DK","-","-","-");
//				new map(ijPubl,"articles/whatnow.htm","-","-","25 years. What now?","-","-","-");
//				new map(ijPubl,"articles/success.htm","-","-","Wind turbine success","-","-","-");
//				new map(ijPubl,"articles/reneweu.htm","-","-","Renewables in the EU","-","-","-");
//				new map(ijPubl,"articles/wtmindk.htm","-","-","Turbine market in DK","-","-","-");
//				new map(ijPubl,"articles/offshore.htm","-","-","Offshore wind energy","-","-","-");
//				new map(ijPubl,"articles/coop.htm","-","-","Co-operatives in DK","-","-","-");
//				new map(ijPubl,"articles/surveys.htm","-","-","Public attitudes","-","-","-");
//				new map(ijPubl,"articles/onice.htm","-","-","Certificates on ice","-","-","-");
//				new map(ijPubl,"articles/reformgr.htm","-","-","Green certificates?","-","-","-");
//				new map(ijPubl,"articles/busiview.htm","-","-","Business view on gr.cert.","-","-","-");
//				new map(ijPubl,"articles/grmarket.htm","-","-","A litmus test on certif.","-","-","-");
//				new map(ijPubl,"articles/grcertif/thennow.htm","-","-","Cert: Then and now","-","-","-");
//				new map(ijPubl,"articles/grcertif/cradle.htm","-","-","Cert: Cradle to grave","-","-","-");
//				new map(ijPubl,"articles/grcertif/searcsys.htm","-","-","Cert: Searching perfection","-","-","-");
//				new map(ijPubl,"articles/grcertif/notalone.htm","-","-","Cert: Not entirely alone","-","-","-");
//				new map(ijPubl,"articles/grcertif/fourthwy.htm","-","-","Cert: A fourth way","-","-","-");
//				new map(ijPubl,"articles/grcertif/proscons.htm","-","-","Cert: Pros and cons","-","-","-");
//				new map(ijPubl,"publ/vindny.htm","-","-","-","-","-","-");
//			var ijCont=new map(ijSite,"cont.xxx","-","-","-","-","-","-FI");
//				new map(ijCont,"email.htm","","Email","E-mail","E-mail","Ecrivez-nous","-FI");
//				new map(ijCont,"about/index.htm","","&Uuml;ber uns","About us","Qui&eacute;nes somos","Sur nous","-FI");
//				new map(ijCont,"about/map.htm","-","Karte mit B&uuml;ro 1:15000","Map with office 1:15000","Mapa y la oficina 1:15000","Plan 1:15000","-FI");
//				new map(ijCont,"about/mapenl.htm","-","Karte mit B&uuml;ro 1:7500","Map with office 1:7500","Mapa y la oficina 1:7500","Plan 1:7500","-FI");
//				new map(ijCont,"about/closeup.htm","-","Ansicht von unserem B&uuml;ro","Image of office","Imagen de la oficina","Notre immeuble","-FI");
//			var ijCopy=new map(ijSite,"copyrght.htm","-","-","-","-","-","-FI");
//			new map(ijSite,"links.htm#manu","-","-","-","-","-","-FI");
//			new map(ijSite,"links.htm#comp","-","-","-","-","-","-FI");
//			new map(ijSite,"links.htm","-","-","-","-","-","-FI");
			var ijVide=new map(ijSite,"vide.xxx","Video","-","-","-","-","-");
				new map(ijVide,"http://www.windpower.org/movies/uabl/uablda.htm","Ud af det Blå","-","-","-","-","-","../movies/uabl/uablcdda.htm");
				new map(ijVide,"http://www.windpower.org/movies/uabl/uablde.htm","-","Aus Blau mach Gr&uuml;n","-","-","-","-","../movies/uabl/uablcdde.htm");
				new map(ijVide,"http://www.windpower.org/movies/uabl/uablen.htm","-","-","Out of the blue","-","-","-","../movies/uabl/uablcden.htm");
				new map(ijVide,"http://www.windpower.org/movies/uabl/uables.htm","-","-","-","Con el viento a favor","-","-","../movies/uabl/uablcdes.htm");
				new map(ijVide,"http://www.windpower.org/movies/uabl/uablfr.htm","-","-","-","-","Dans le vent","-","../movies/uabl/uablcdfr.htm");
//				new map(ijVide,"http://www.windpower.org/movies/rodsand/airmrkda.htm","-","-","-","-","-","-","../movies/rodsand/airmrkda.htm");
//				new map(ijVide,"http://www.windpower.org/movies/middelgr/midde/webcam.htm","-","Middelgrunden webcam","-","-","-","-","../movies/middelgr/midde.htm");
//				new map(ijVide,"http://www.windpower.org/movies/middelgr/midda/webcam.htm","-","-","-","-","-","-","../movies/middelgr/midda/webcam.htm");
//				new map(ijVide,"http://www.windpower.org/movies/middelgr/miden/webcam.htm","-","-","Middelgrunden webcam","-","-","-","../movies/middelgr/miden/webcam.htm");
//				new map(ijVide,"http://www.windpower.org/movies/middelgr/mides/webcam.htm","-","-","-","Middelgrunden webcam","-","-","../movies/middelgr/mides.htm");
//				new map(ijVide,"http://www.windpower.org/movies/middelgr/midfr/webcam.htm","-","-","-","-","Middelgrunden webcam","-","../movies/middelgr/midfr.htm");
//				new map(ijVide,"news/foundoff.htm","Offshorefundamenter","Offshorefundamente","Offshore foundations","Cimentaciones marinos","Fondations offshore","-FI");
//				new map(ijVide,"http://www.windpower.org/movies/mort/mortda.htm","-","-","-","-","-","-FI");
//			new map(ijSite,"http://www.windpower.org/da/download/index.htm","-","-","-","-","-","-");
//			new map(ijSite,"http://www.windpower.org/de/download/index.htm","-","-","-","-","-","-");
//			new map(ijSite,"http://www.windpower.org/en/download/index.htm","-","-","-","-","-","-");
//			new map(ijSite,"http://www.windpower.org/es/download/index.htm","-","-","-","-","-","-");
//			new map(ijSite,"http://www.windpower.org/fr/download/index.htm","-","-","-","-","-","-");
//			new map(ijSite,"http://www.windpower.org/da/download/index.htm","Postliste","-","-","-","-","-FI");
//			new map(ijSite,"http://www.windpower.org/de/download/index.htm","-","Mailingliste","-","-","-","-FI");
//			new map(ijSite,"http://www.windpower.org/en/download/index.htm","-","-","Mailing list","-","-","-FI");
//			new map(ijSite,"http://www.windpower.org/es/download/index.htm","-","-","-","Lista de correo","-","-FI");
//			new map(ijSite,"http://www.windpower.org/fr/download/index.htm","-","-","-","-","Liste de diffusion","-FI");
//			new map(ijSite,"http://windpower.butik.jubii.dk/default.asp?lang=uk","-","-","-","-","-","-FI");
//			var daMill=new map(ijSite,"kids/index.htm","-","-","-","-","-","-FI");

// ------------------------

//				new map(ijDomain,"../da/core.htm","-","Dansk","Dansk","Dansk","Dansk","Dansk");
//				new map(ijDomain,"../de/core.htm","-","-","Deutsch","Deutsch","Deutsch","Deutsch");
//				new map(ijDomain,"../en/core.htm","-","English","English","English","English","English");
//				new map(ijDomain,"../es/core.htm","-","Espa&ntilde;ol","Espa&ntilde;ol","Espa&ntilde;ol","Espa&ntilde;ol","Espa&ntilde;ol");
//				new map(ijDomain,"../fr/core.htm","-","Fran&ccedil;ais","Fran&ccedil;ais","Fran&ccedil;ais","Fran&ccedil;ais","Fran&ccedil;ais");