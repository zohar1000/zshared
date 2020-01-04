import { StringUtils } from './string.utils';

export class TimeUtils {

	/*************************************/
	/*  general function                 */
	/*************************************/

	static sleep(time) {
		return new Promise<any>((resolve, reject) => {
			setTimeout(resolve, time);
		});
	}


	/***************************/
	/*   UTC time functions    */
	/***************************/

	static getUtcEpoch(d: Date = new Date()) {
		return d.getTime();
	}

	// opts: isUndashed (boolean) - to replace dashes with spaces, default false
	static getUtcUniDate(d: Date = new Date(), opts: any = {}): string {
		let uniDate = d.toISOString().substr(0, 10);
		if (opts.isUndashed) uniDate = uniDate.replace(/-/g, ' ');
		return uniDate;
	}

	// opts: isMs (boolean) - include milliseconds, default false
	static getUtcUniDateTime(d: Date = new Date(), opts: any = {}): string {
		const len = opts.isMs ? 23 : 19;
		return d.toISOString().substr(0, len).replace('T', ' ');
	}

	static getUtcCurrUniDate(opts: any = {}): string {
		return TimeUtils.getUtcUniDate(new Date(), opts);
	}

	static getUtcCurrUniDateTime(opts: any = {}): string {
		return TimeUtils.getUtcUniDateTime(new Date(), opts);
	}


	/*****************************/
	/*   local time functions    */
	/*****************************/

	static getLocalEpoch(d: Date = new Date()) {
		return d.getTime() - d.getTimezoneOffset() * 60 * 1000;
	}

	static getLocalDate(d: Date = new Date()) {
		return new Date(TimeUtils.getLocalEpoch(d));
	}

	static getLocalUniDate(d: Date = new Date(), opts: any = {}): string {
		return TimeUtils.getUtcUniDate(TimeUtils.getLocalDate(d), opts);
	}

	static getLocalUniDateTime(d: Date = new Date(), opts: any = {}): string {
		return TimeUtils.getUtcUniDateTime(TimeUtils.getLocalDate(d), opts);
	}

	static getLocalCurrUniDate(opts: any = {}): string {
		return TimeUtils.getUtcUniDate(TimeUtils.getLocalDate(), opts);
	}

	static getLocalCurrUniDateTime(opts: any = {}): string {
		return TimeUtils.getUtcUniDateTime(TimeUtils.getLocalDate(), opts);
	}

	
	/*************************************/
	/*  conversions                      */
	/*************************************/

	static isoString2UniDate(isoString: string): string {
		return isoString.substr(0, 10);
	}

	static isoString2UniDateTime(isoString: string): string {
		return isoString.substr(0, 23).replace('T', ' ');
	}

	static gregDate2Date(greg) {
		const months = {
			Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
			Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
		};
		const year = greg.substr(8, 4);
		const month = months[greg.substr(0, 3)];
		const day = greg.substr(4, 2);
		const uniDate = `${year}-${month}-${day}`;
		let utcEpoch = (new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0))).valueOf();
		if (utcEpoch < 0) utcEpoch = 0;
		return { uniDate, utcEpoch };
	}


	/************************************************/
	/*  get formatted uni time, meaning hh:mm:ss    */
	/************************************************/

	static seconds2UniTime(secs, opts = { isHours: true }) {
		let hours = Math.floor(secs / 3600) % 24;
		const minutes = Math.floor(secs / 60) % 60;
		let values = [minutes, secs % 60];
		if (!opts.hasOwnProperty('isHours') || opts.isHours) values.unshift(hours);
		return values
			.map(v => v < 10 ? '0' + v : v)
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	}

	static ms2UniTime(ms, opts?) {
		return TimeUtils.seconds2UniTime(Math.round(ms / 1000), opts);
	}

	// get time difference between now and a previous point in time. to be used in logs, etc.
	static getMsDiffUniDateTime(localEpoch, opts?) {
		return TimeUtils.ms2UniTime(Date.now() - localEpoch, opts);
	}
}
