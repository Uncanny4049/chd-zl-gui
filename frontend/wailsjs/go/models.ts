export namespace backend {
	
	export class CopyRecord {
	    copyName?: string;
	    status?: string;
	    // Go type: time
	    startTime?: any;
	    // Go type: time
	    endTime?: any;
	    timeConsuming?: number;
	    predict?: number;
	    actual?: number;
	    revival?: number;
	    noPickEqu?: number;
	    noPickCon?: number;
	    noPickOth?: number;
	    noPickTask?: number;
	    blood?: number;
	    potionPlan?: string;
	    equipmentPlan?: string;
	    petFormation?: string;
	    limitTimeOut?: number;
	    limitRevival?: number;
	    extraCard?: number;
	    extraRef?: number;
	    deathRes?: number;
	    experienceWings?: number;
	    aggroAndMobPulling?: number;
	    treasureChestWaiting?: number;
	    changeTitle?: string;
	    bossEvasion?: number;
	    doNotAttackTheLord?: number;
	    type1: string[];
	    type2: string[];
	    type3: string[];
	    type4: {[key: string]: number};
	
	    static createFrom(source: any = {}) {
	        return new CopyRecord(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.copyName = source["copyName"];
	        this.status = source["status"];
	        this.startTime = this.convertValues(source["startTime"], null);
	        this.endTime = this.convertValues(source["endTime"], null);
	        this.timeConsuming = source["timeConsuming"];
	        this.predict = source["predict"];
	        this.actual = source["actual"];
	        this.revival = source["revival"];
	        this.noPickEqu = source["noPickEqu"];
	        this.noPickCon = source["noPickCon"];
	        this.noPickOth = source["noPickOth"];
	        this.noPickTask = source["noPickTask"];
	        this.blood = source["blood"];
	        this.potionPlan = source["potionPlan"];
	        this.equipmentPlan = source["equipmentPlan"];
	        this.petFormation = source["petFormation"];
	        this.limitTimeOut = source["limitTimeOut"];
	        this.limitRevival = source["limitRevival"];
	        this.extraCard = source["extraCard"];
	        this.extraRef = source["extraRef"];
	        this.deathRes = source["deathRes"];
	        this.experienceWings = source["experienceWings"];
	        this.aggroAndMobPulling = source["aggroAndMobPulling"];
	        this.treasureChestWaiting = source["treasureChestWaiting"];
	        this.changeTitle = source["changeTitle"];
	        this.bossEvasion = source["bossEvasion"];
	        this.doNotAttackTheLord = source["doNotAttackTheLord"];
	        this.type1 = source["type1"];
	        this.type2 = source["type2"];
	        this.type3 = source["type3"];
	        this.type4 = source["type4"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

