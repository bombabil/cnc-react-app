/**
 * Created by Bombassd on 03.01.2017.
 */



export const calcBaseUpCost = (buildings) => {
    const costs_tiberium =  [1, 2, 3, 4, 20, 110, 360, 1100, 3200, 8800, 22400, 48000, 63360, 83635, 110398, 145726, 192358, 253913, 335165, 442418, 583992, 770869, 1017547, 1343162, 1772974, 2340326,
        3089230, 4077783, 5382674, 7105130, 9378771, 12379978, 16341571, 21570873, 28473552, 37585089, 49612318, 65488260, 86444503, 114106743, 150620901, 198819590, 262441859, 346423253,
        457278694, 603607877, 796762397, 1051726364, 1388278801, 1832528017, 2418936983, 3192996817, 4214755798, 5563477654, 7343790503, 9693803464, 12795820573, 16890483156, 22295437766,
        29429977851, 38847570764, 51278793408, 67688007299, 89348169635, 117939583918, 117939583918]
    let costs = {
        tib:0,
        power: 0
    }
    buildings.forEach(function(building){
        if(building.type  && building.lvl <= 65) {
            switch(building.type)
            {
                case "n":       // kris harvester
                case "h":       // tib harvester
                    costs.tib += costs_tiberium[building.lvl]
                    costs.power += Math.round(costs_tiberium[building.lvl]/4*3 )    //power coosts for a harvester
                    break
                case "s":       // silo
                case "a":       // akku
                    costs.tib += costs_tiberium[building.lvl]
                    costs.power += Math.round(costs_tiberium[building.lvl]/4)
                    break
                case "r":       // rafenerieeee
                    costs.tib += costs_tiberium[building.lvl]*2 // dubble costs
                    costs.power += Math.round(costs_tiberium[building.lvl]/2)       //power costs for a raf
                    break
            }
        }

    })

    console.error("KOMME IC BIS HIER HNI????")
    return costs
}

const allBuildingLvLUp = (base, lvl = 0) => {
    if(base.buildings) {
        base.buildings.forEach(function(building){
            if (building.lvl){
                building.lvl += lvl     //upgrade building lvl
                if (building.lvl > 65) building.lvl = 65        // check for max lvl (65)
            }
        })
    }
    return base
}

export const productionOverDays = (base, days) => {
    base = cloneObject(base)
    let prodOverTime = []
    let limit = days*24
    let time = 0
    while(time < limit) {
        console.error("WHILE WIRD IMMER WIEDER AUFGERUFEB=??")
        console.log(time)
        console.log(limit)
        let production = calcBaseProduction(base.buildings)
        let costs = calcBaseUpCost(base.buildings)
        console.log(production)
        console.log(costs)
        prodOverTime.push({
            production,
            time
        })
        base = allBuildingLvLUp(base, 1)
        let cost = 0
        if (costs.tib/production.tib > costs.power/production.power) cost = costs.tib/production.tib
        else cost = costs.power/production.power
        time  +=  cost
    }
    let ret = {}
    ret.days = days
    ret.time = prodOverTime.map((time) => {return Math.round(time.time*100/24)/100})       //round
    ret.tib = prodOverTime.map((prod) => {return prod.production.tib})
    ret.cris = prodOverTime.map((prod) => {return prod.production.cris})
    ret.power = prodOverTime.map((prod) => {return prod.production.power})
    ret.credits = prodOverTime.map((prod) => {return prod.production.credits})
    console.log("DIREKT LÖSCHEN")
    console.log(ret)
    return ret
}

function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}
/*
    calc the produktion from Base
 */
export const calcBaseProduction = (buildings) =>
{
    let production = [0,0,0,0]      // [tib, kris, power, credits]
    const neighbours = [-10, -9, -8, -1, 1, 8, 9, 10]
    const silo_production = [0,72, 90, 125, 170, 220, 275, 335, 400, 460, 530, 610, 710, 887, 1109, 1386, 1733, 2166, 2708, 3385, 4231, 5289, 6612, 8265, 10331,
        12914, 16143, 20179, 25224, 31530, 39412, 49266, 61582, 76978, 96222, 120278, 150348, 187935, 234919, 293649,
        367061, 458826, 573533, 716916, 896145, 1120182, 1400228, 1750285, 2187856, 2734820, 3418525, 4273157, 5341446,
        6676807, 8346009, 10432512, 13040640, 16300800, 20376000, 25470000, 31837501, 39796876, 49746095, 62182619,
        77728274, 97160342];  //Stufe 12 Silo Produziert array[12] tiberium * Anzahl der Sammler
    const accu_production = [ 0, 48, 60, 80, 110, 145, 185, 225, 265, 310, 355, 405, 465, 581, 726, 908, 1135, 1419, 1773, 2217, 2771, 3464, 4330, 5413, 6766, 8458,
        10572, 13216, 16520, 20650, 25812, 32265, 40332, 50415, 63019, 78774, 98467, 123084, 153855, 192319, 240399, 300499,
        375624, 469530, 586912, 733640, 917050, 1146313, 1432891, 1791114, 2238893, 2798616, 3498271, 4372838, 5466048,
        6832560, 8540701, 10675876, 13344845, 16681056, 20851321, 26064151, 32580189, 40725236, 50906545, 63633182];
    const harvest_production_packet = [0, 40, 300, 432, 570, 735, 920, 1120, 1330, 1560, 1800, 2050, 2360, 2950, 3687, 4609, 5761, 7202, 9002, 11253, 14066, 17583,
        21979, 27474, 34342, 42928, 53660, 67075, 83844, 104805, 131006, 163757, 204697, 255871, 319839, 399799, 499749,
        624686, 780858, 976073, 1220091, 1525114, 1906392, 2382991, 2978738, 3723423, 4654279, 5817849, 7272311,
        9090389, 11362986, 14203733, 17754666, 22193333, 27741666, 34677083, 43346354, 54182942, 67728678, 84660848,
        105826060, 132282575, 165353218, 206691523, 258364404, 322955505]

    const raf_production_perm = [0, 120, 150, 180, 240, 315, 400, 485, 575, 680, 790, 924, 1080, 1350, 1687, 2109, 2636, 3295, 4119, 5149, 6437, 8046, 10058, 12572, 15716, 19645, 24556, 30695, 38369, 47961, 59952, 74940, 93675, 117093, 146367, 182959, 228698, 285873, 357342,
        446677, 558346, 697933, 872417, 1090521, 1363151, 1703939, 2129924, 2662405, 3328006, 4160008, 5200010,
        6500013, 8125016, 10156271, 12695338, 15869173, 19836467, 24795583, 30994479, 38743099, 48428874, 60536093,
        75670117, 94587646, 118234557, 147793197 ]
    const raf_production_pp = [0, 72, 90, 110, 145, 190, 240, 290, 345, 410, 475, 555, 650, 812, 1015, 1269, 1586, 1983, 2479, 3099, 3874, 4842, 6053, 7566, 9458,
        11823, 14779, 18474, 23092, 28865, 36082, 45102, 56378, 70473, 88091, 110114, 137642, 172053, 215066, 268833,
        336042, 420052, 525065, 656332, 820415, 1025519, 1281898, 1602373, 2002967, 2503708, 3129636, 3912045, 4890056,
        6112570, 7640713, 9550891, 11938614, 14923268, 18654085, 23317606, 29147008, 36433760, 45542200, 56927750,
        71159687, 88949609, 111187011, 138983764, 173729706, 217162132, 271452665, 339315832, 424144790, 530180988,
        662726235, 828407793]

    const pp_production_perm = [ 0, 120, 150, 198, 270, 360, 459, 560, 660, 780, 900, 1025, 1166, 1458, 1822, 2278, 2847, 3559, 4449, 5562, 6952, 8691, 10863, 13579,
        16974, 21218, 26523, 33153, 41442, 51803, 64753, 80942, 101177, 126472, 158090, 197612, 247015, 308769, 385962,
        482453, 603066, 753832, 942291, 1177863, 1472329, 1840412, 2300515, 2875644, 3594555, 4493194, 5616493,
        7020616, 8775770, 10969713, 13712141, 17140177, 21425221, 26781526, 33476908, 41846135, 52307669, 65384586,
        81730732, 102163416, 127704270, 159630337, 199537922, 249422402, 311778003, 389722504, 487153130,
        608941412, 761176766, 951470957, 1189338697, 1486673371]
    const pp_production_accu = [0, 72, 90, 120, 160, 215, 275, 335, 400, 460, 530, 610, 700, 875, 1093, 1367, 1708, 2136, 2670, 3337, 4172, 5215, 6519, 8149, 10186,
        12732, 15916, 19895, 24868, 31086, 38857, 48572, 60715, 75894, 94867, 118584, 148230, 185288, 231610, 289513,
        361891, 452364, 565455, 706819, 883524, 1104405, 1380506, 1725633, 2157041, 2696301, 3370377, 4212971, 5266214,
        6582768, 8228460, 10285575, 12856969, 16071211, 20089014, 25111268, 31389085, 39236357, 49045446, 61306807,
        76633509, 95791887, 119739859, 149674823, 187093529, 233866912, 292333640, 365417050, 456771312, 570964140,
        713705176, 892131470]
    const pp_production_credit= [0, 48, 60, 75, 100, 125, 160, 195, 230, 270, 315, 370, 430, 537, 671, 839, 1049, 1312, 1640, 2050, 2562, 3203, 4004, 5005, 6257, 7821,
        9777, 12221, 15276, 19095, 23869, 29837, 37296, 46620, 58275, 72844, 91056, 113820, 142275, 177843, 222304, 277880,
        347351, 434189, 542736, 678420, 848025, 1060031, 1325039, 1656299, 2070374, 2587968, 3234960, 4043700, 5054625,
        6318282, 7897852, 9872315, 12340394, 15425493, 19281866, 24102333, 30127916, 37659896, 47074870, 58843587,
        73554484, 91943106, 114928882, 143661103, 179576378, 224470473, 280588092, 350735115, 438418893, 548023617]

    buildings.forEach((building, i) =>
    {
        // exist building
        if(building) {
            if(building.lvl > 65) building.lvl = 65
            // get tib/kris Silo?
            if (building.type === "s")
            {
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                         if (buildings[j] && buildings[j].type === "h")     // h = tib
                        {
                            production[0] += silo_production[building.lvl]       // 0 = tib
                        } else if (buildings[j] && buildings[j].type === "n")     //n = kris
                        {
                            production[1] += silo_production[building.lvl]      // 1 = kris
                        }

                    }
                })
            }

            // get tib harvester Production
            else if (building.type === "h")
            {
                //chick if silo around exists
                let hasSilo = false
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        // find silo
                        if (buildings[j] && ( buildings[j].type === "s" ))
                        {
                            hasSilo = true  //silo found
                        }
                    }
                })
                if(hasSilo) production[0] += silo_production[building.lvl]
                production[0] += harvest_production_packet[building.lvl]
            }

            // get kris harvester Production
            else if (building.type === "n")
            {
                //chick if silo around exists
                let hasSilo = false
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        // find silo
                        if (buildings[j] && ( buildings[j].type === "s" ))
                        {
                            hasSilo = true  //silo found
                        }
                    }
                })
                if(hasSilo) production[1] += silo_production[building.lvl]
                production[1] += harvest_production_packet[building.lvl]
            }

            // get power from accu
            else if (building.type === "a")
            {
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        if (buildings[j] && buildings[j].type === "p")     // p = PowerPlant
                        {
                            production[2] += accu_production[building.lvl]       // 2 = power
                        }


                    }
                })
            }

            // get power from PowerPlants
            else if (building.type === "p")
            {
                let hasAccu = false
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        //find kris fields around
                        if (buildings[j] && (buildings[j].type === "n" || buildings[j].type === "c"))     // p = PowerPlant
                        {
                            production[2] += pp_production_perm[building.lvl]/2       // 2 = power
                        }
                        //find 1 accu around
                        if (buildings[j] && buildings[j].type === "a" )
                        {
                            hasAccu = true;
                        }
                        //find rafs around
                        if(buildings[j] && buildings[j].type === "r")
                        {
                            production[3] += pp_production_credit[building.lvl]
                        }
                    }
                })

                if (hasAccu) production[2] += pp_production_accu[building.lvl]
                production[2] += pp_production_perm[building.lvl]
            }

            //get credits from Rafs
            else if (building.type === "r")
            {
                let hasPp = false
                //count harvester/tib's around
                neighbours.forEach((n) =>
                {
                    let j = i + n       // j: neighbour
                    if (0 <= j && j <= 71)
                    {
                        // find harvest/tib
                        if (buildings[j] && ( buildings[j].type === "t" || buildings[j].type === "h"))
                        {
                            production[3] += raf_production_perm[building.lvl]/2 // production[3] = credis
                        }
                        //find one PowerPlant
                        if (buildings[j] && (buildings[j].type === "p"))
                        {
                            hasPp = true
                        }
                    }
                })
                if(hasPp) production[3] += raf_production_pp[building.lvl]
                // ground credit production
                production[3] += raf_production_perm[building.lvl]
            }
        }
    })

    return {
        tib: production[0],
        cris: production[1],
        power: production[2],
        credits: production[3],
    }
}
