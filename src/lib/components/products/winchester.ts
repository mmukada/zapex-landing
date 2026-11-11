// The basemap is a stylised plan of central Winchester on a 1200×800 canvas,
// at about 1.3 metres to the pixel.
export const MAIN_ROADS =
	'M-20 296L250 318L935 389.9C1030 372 1120 352 1220 340M372.8-33.1L282.5 826.9M356 126.9L946 188.9C1010 196 1110 206 1220 190M356 126.9L235 118L140-20M235 118L-20 60M250 318L235 118M341.5 264.9L646.5 296.9M518.1 219.8L803.1 249.7M790 374.7L811 174.7M935 389.9C945 500 955 640 1000 820';
export const SIDE_STREETS =
	'M292 322.4L311.4 137.4M391.5 270.2L406 132.2M440 337.9L461 137.9M511.5 282.8L526 144.8M570 351.6L591 151.6M646.5 296.9L661 158.9M505 344.8L500.8 384.8M425.8 376.9L515.8 386.4M447.8 379.2L429.9 549.2M385 332.2L362.9 542.2M329.2 381.9L379.2 387.2M312.9 536.9L618 569M304.6 616.9L609.5 649M618 569L587.5 859M613.8 609L853.8 634.1M720 367.4L706.9 492.4L866.9 509.1M318.2 486.9L-20 440M365.4 36.9L670.5 68.9M541 146.4L550.5 56.4M935 389.9C960 300 990 200 1050 100M952 600C1040 590 1130 620 1220 640';
export const RIVER = 'M975-40C962 110 918 250 914 388S930 640 905 840';
export const RAILWAY = 'M205-20C175 130 120 310 45 520S-15 760-30 820';
// Cathedral Close, Abbey Gardens, River Park, Oram's Arbour, St Giles Hill and Wolvesey.
export const GREENS =
	'M463.7 401.1 698.7 425.8 684.4 561.8 449.4 537.1ZM735.5 383.1 833.5 393.4 823.5 489.4 725.5 479.1ZM682.7 145.1 922.7 170.2 939.9 6.2 699.9-18.9ZM20 170 120 160 135 262 30 276ZM1010 430 1210 405 1210 585 1040 585ZM722.3 509.1 865.3 524.1 855.2 620.1 712.2 605.1Z';
// The cathedral, the Great Hall and the station.
export const BUILDINGS =
	'M494 449.8 679 469.2 676.2 495.2 491.2 475.8ZM603.2 440 631.2 442.9 624 510.9 596 508ZM201.1 331.1 241.1 335.3 236.1 383.3 196.1 379.1ZM150 78 196 70 200 92 154 100Z';

export type MapLabelKind = 'street' | 'place' | 'green' | 'water' | 'area' | 'city';

export interface MapLabel {
	name: string;
	x: number;
	y: number;
	angle: number;
	kind: MapLabelKind;
}

// Each name is centred on x,y and turned to run along its street.
export const MAP_LABELS: MapLabel[] = [
	{ name: 'Romsey Road', x: 112, y: 307, angle: 4.7, kind: 'street' },
	{ name: 'High Street', x: 478, y: 341.9, angle: 6, kind: 'street' },
	{ name: 'High Street', x: 662, y: 361.3, angle: 6, kind: 'street' },
	{ name: 'The Broadway', x: 756, y: 371.1, angle: 6, kind: 'street' },
	{ name: 'Bridge Street', x: 862, y: 382.3, angle: 6, kind: 'street' },
	{ name: 'Magdalen Hill', x: 1085, y: 358, angle: -6, kind: 'street' },
	{ name: 'St George’s Street', x: 479.5, y: 279.4, angle: 6, kind: 'street' },
	{ name: 'Friarsgate', x: 725.1, y: 241.5, angle: 6, kind: 'street' },
	{ name: 'North Walls', x: 499, y: 141.9, angle: 6, kind: 'street' },
	{ name: 'North Walls', x: 741, y: 167.4, angle: 6, kind: 'street' },
	{ name: 'Wales Street', x: 1090, y: 203, angle: 2, kind: 'street' },
	{ name: 'City Road', x: 294, y: 122.5, angle: 4, kind: 'street' },
	{ name: 'Stockbridge Road', x: 100, y: 87.5, angle: 12.8, kind: 'street' },
	{ name: 'Sussex Street', x: 242.5, y: 216, angle: -94, kind: 'street' },
	{ name: 'St Swithun Street', x: 507.9, y: 557.4, angle: 6, kind: 'street' },
	{ name: 'Canon Street', x: 459.6, y: 633.2, angle: 6, kind: 'street' },
	{ name: 'College Street', x: 733.8, y: 621.5, angle: 6, kind: 'street' },
	{ name: 'The Square', x: 455.8, y: 380, angle: 6, kind: 'street' },
	{ name: 'Colebrook Street', x: 786.9, y: 500.8, angle: 6, kind: 'street' },
	{ name: 'Hyde Abbey Road', x: 470.4, y: 47.9, angle: 6, kind: 'street' },
	{ name: 'Jewry Street', x: 348.8, y: 195.9, angle: -84, kind: 'street' },
	{ name: 'Hyde Street', x: 363.1, y: 58.9, angle: -84, kind: 'street' },
	{ name: 'Southgate Street', x: 321.9, y: 451.9, angle: -84, kind: 'street' },
	{ name: 'Southgate Street', x: 294.1, y: 716.9, angle: -84, kind: 'street' },
	{ name: 'Staple Gdns', x: 303.8, y: 210.4, angle: -84, kind: 'street' },
	{ name: 'St Peter Street', x: 398.8, y: 201.2, angle: -84, kind: 'street' },
	{ name: 'Parchment Street', x: 453.8, y: 206.9, angle: -84, kind: 'street' },
	{ name: 'Upper Brook St', x: 522.1, y: 181.9, angle: -84, kind: 'street' },
	{ name: 'Middle Brook St', x: 587.1, y: 188.6, angle: -84, kind: 'street' },
	{ name: 'Lower Brook St', x: 657.1, y: 195.9, angle: -84, kind: 'street' },
	{ name: 'Eastgate Street', x: 796.5, y: 312.7, angle: -84, kind: 'street' },
	{ name: 'St Thomas Street', x: 370.8, y: 467.2, angle: -84, kind: 'street' },
	{ name: 'Great Minster St', x: 438.9, y: 464.2, angle: -84, kind: 'street' },
	{ name: 'Kingsgate Street', x: 599.6, y: 744, angle: -84, kind: 'street' },
	{ name: 'Chesil Street', x: 946, y: 520, angle: -93, kind: 'street' },
	{ name: 'St John’s Street', x: 968, y: 290, angle: -73, kind: 'street' },
	{ name: 'Winchester Cathedral', x: 578.1, y: 524.3, angle: 0, kind: 'place' },
	{ name: 'The Great Hall', x: 214.6, y: 395.2, angle: 0, kind: 'place' },
	{ name: 'Winchester Station', x: 128, y: 112, angle: 0, kind: 'place' },
	{ name: 'Abbey Gardens', x: 779.5, y: 436.3, angle: 0, kind: 'green' },
	{ name: 'River Park', x: 811.1, y: 77.6, angle: 0, kind: 'green' },
	{ name: 'Oram’s Arbour', x: 78, y: 218, angle: 0, kind: 'green' },
	{ name: 'St Giles Hill', x: 1115, y: 505, angle: 0, kind: 'green' },
	{ name: 'Wolvesey Castle', x: 788.3, y: 564.6, angle: 0, kind: 'green' },
	{ name: 'River Itchen', x: 928, y: 285, angle: -80, kind: 'water' },
	{ name: 'River Itchen', x: 919, y: 610, angle: -87, kind: 'water' }
];

// The city map is the same place two zoom levels out: Winchester and its
// suburbs on a 1200×800 canvas at about 5 metres to the pixel. The basemap
// above sits inside it at a quarter of its size (see CITY_INSET), and the
// roads here start where its main roads leave its edges.
export const CITY_INSET = 'translate(490 300) scale(0.25)';
export const CITY_ROADS =
	'M485 374C420 380 330 400 260 440S110 540-20 580M485 315C430 290 330 220 250 150S90 60-20 20M525 295C515 220 490 110 470-20M583 292C590 200 610 100 640-20M795 347.5C850 330 900 290 945 240M795 385C900 395 1050 395 1220 365M740 505C770 560 820 610 880 640C930 680 1010 740 1100 830M560.6 506.7L552 620L548 740L550 830M150 505C260 600 400 720 545 790';
export const CITY_STREETS =
	'M505 200C450 205 400 215 350 235M300 190C340 120 410 80 480 60M200 110C280 80 350 40 420 5M330 222C310 290 300 350 300 415M500 160C535 158 570 165 600 170M850 325C880 345 880 375 860 392M760 540C790 545 820 550 845 562M600 130C640 128 670 135 700 142M485 343C450 350 410 356 370 362M485 328C455 322 425 320 395 322M440 378C448 440 455 500 470 560M330 402C340 500 420 590 553 660M485 410C440 418 380 424 330 432M637 515C625 580 600 650 553 700M553 640C640 632 720 625 800 618M795 460C840 470 880 480 915 500M150 505C120 560 100 640 90 720M250 150C230 220 215 260 200 292M250 60C300 70 340 95 360 130M1020 392C1060 470 1100 530 1140 600M400 560C440 580 470 620 480 660';
export const CITY_MOTORWAY =
	'M900-20C930 80 950 160 945 240C940 340 960 430 930 520S850 680 770 830';
export const CITY_TRUNK_ROAD = 'M945 240C960 150 975 60 985-20';
// The river and the railway beyond the inset, north and south of it.
export const CITY_RIVER = 'M790-20C770 90 745 200 734 290M716 510C720 600 690 700 680 820';
export const CITY_RAILWAY = 'M655-20C620 140 575 240 541 295M482.5 505C470 600 450 720 430 820';
// Teg Down, Winnall Moors, the water meadows, St Catherine's Hill, Magdalen Hill Down and Whiteshute Ridge.
export const CITY_GREENS =
	'M90 300 250 290 290 400 180 430 80 400ZM738 120 800 110 790 292 742 292ZM650 515 725 515 705 790 600 800 620 640ZM730 690 800 680 825 735 770 765 725 745ZM1030 410 1200 395 1200 470 1040 480ZM330 700 480 740 470 800 320 800Z';

export const CITY_SHIELDS = [
	{ name: 'M3', x: 945, y: 328, tone: 'fill-sky-700/70' },
	{ name: 'M3', x: 897, y: 598, tone: 'fill-sky-700/70' },
	{ name: 'A34', x: 965, y: 110, tone: 'fill-green-700/70' }
] as const;

export const CITY_LABELS: MapLabel[] = [
	{ name: 'Winchester', x: 640, y: 412, angle: 0, kind: 'city' },
	{ name: 'Weeke', x: 385, y: 165, angle: 0, kind: 'area' },
	{ name: 'Harestock', x: 300, y: 45, angle: 0, kind: 'area' },
	{ name: 'Fulflood', x: 372, y: 322, angle: 0, kind: 'area' },
	{ name: 'Hyde', x: 640, y: 270, angle: 0, kind: 'area' },
	{ name: 'Abbotts Barton', x: 680, y: 118, angle: 0, kind: 'area' },
	{ name: 'Winnall', x: 860, y: 358, angle: 0, kind: 'area' },
	{ name: 'Highcliffe', x: 838, y: 518, angle: 0, kind: 'area' },
	{ name: 'Bar End', x: 812, y: 668, angle: 0, kind: 'area' },
	{ name: 'St Cross', x: 500, y: 728, angle: 0, kind: 'area' },
	{ name: 'Stanmore', x: 425, y: 610, angle: 0, kind: 'area' },
	{ name: 'Badger Farm', x: 200, y: 690, angle: 0, kind: 'area' },
	{ name: 'Sleepers Hill', x: 385, y: 458, angle: 0, kind: 'area' },
	{ name: 'Chilcomb', x: 1130, y: 580, angle: 0, kind: 'area' },
	{ name: 'Stockbridge Road', x: 401.6, y: 266.3, angle: 33.7, kind: 'street' },
	{ name: 'Romsey Road', x: 374.4, y: 394.3, angle: -15.3, kind: 'street' },
	{ name: 'Andover Road', x: 501.3, y: 158.1, angle: -100.7, kind: 'street' },
	{ name: 'Worthy Road', x: 602.9, y: 146.5, angle: -79.4, kind: 'street' },
	{ name: 'St Cross Road', x: 556, y: 565, angle: -85.7, kind: 'street' },
	{ name: 'Easton Lane', x: 873.8, y: 305.9, angle: -36.4, kind: 'street' },
	{ name: 'Alresford Road', x: 1070, y: 386, angle: -4, kind: 'street' },
	{ name: 'Bar End Road', x: 798.8, y: 581.9, angle: 44.2, kind: 'street' },
	{ name: 'Badger Farm Road', x: 314, y: 641, angle: 40, kind: 'street' },
	{ name: 'Teg Down', x: 180, y: 358, angle: 0, kind: 'green' },
	{ name: 'Winnall Moors', x: 776, y: 212, angle: -82, kind: 'green' },
	{ name: 'Water Meadows', x: 648, y: 705, angle: -80, kind: 'green' },
	{ name: 'St Catherine’s Hill', x: 775, y: 724, angle: 0, kind: 'green' },
	{ name: 'Magdalen Hill Down', x: 1120, y: 438, angle: 0, kind: 'green' },
	{ name: 'River Itchen', x: 766, y: 92, angle: -80, kind: 'water' },
	{ name: 'River Itchen', x: 711.9, y: 594, angle: -88, kind: 'water' }
];
