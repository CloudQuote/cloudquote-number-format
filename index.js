
export function formatNumber(v,f) { //number, format object
	if (! (f.Decimals >= 0)) f.Decimals = 0;
	if (v === 0 || isNaN(v)) return f.Default;
	let o = []; //output
	if (v < 0) {
		o.push('-');
		v = Math.abs(v);
	} else if (v > 0 && f.Plus) {
		o.push('+');
	}

	if (f.Prefix !== null) {
		o.push(f.Prefix);
	}

	let ex = ''; // Extension: K/M/B
	if (f.Compact) {
		if (v >= 1000000000) {
			v /= 1000000000;
			ex = "B";
		} else if (v >= 1000000) {
			v /= 1000000;
			ex = "M";
		} else if (v >= 1000) {
			v /= 1000;
			ex = "K";
		}
	}

	v = parseFloat(v).toFixed(f.Decimals);

	if (f.Comma) {
		let end = v.indexOf('.');
		if (end === -1) {
			end = v.length;
		}
		if (end > 3) {
			let parts = new Array();
			let fraction = v.substr(end,v.length);

			let i = end - 3;
			for (; i > 0; i -= 3) {
				parts.push(v.substr(i,3));
			}
			parts.push(v.substr(0,i+3));
			v = parts.reverse().join(",") + fraction;
		}
	}
	o.push(v);
	o.push(ex);
	if (f.Suffix !== null) {
		o.push(f.Suffix);
	}
	return o.join("");
};
