export function formatNumber(value,{
 Decimals = 0,
 Default,
 Prefix,
 Suffix,
 Plus,
 Comma,
 Compact
}) {
 if (value === 0 || isNaN(value) || value == null) return Default;
 
 //number, format object
 if (Decimals === 'auto') {
  const absValue = Math.abs(value);
  if (absValue >= 1000) {
   Decimals = 0;
  } else if (absValue>= 10) {
   Decimals = 2;
  } else if (absValue >= 1) {
   Decimals = 3;
  } else {
   Decimals = 4;
  }
 } else if (Decimals === 'auto.2') {
  const absValue= Math.abs(value);
  if (absValue >= 10) {
   Decimals = 2;
  } else if (absValue >= 1) {
   Decimals = 3;
  } else {
   Decimals = 4;
  }
 }
 
	if (value === 0 || isNaN(value) || value == null) return Default;

	const res = []; //output
	if (value < 0) {
		res.push('-');
		value = -value;
	} else if (value > 0 && Plus) {
		res.push('+');
	}

	if (Prefix !== null) {
		res.push(Prefix);
	}

 let ext = ''; // Extension: K/M/B
	if (Compact) {
		if (value >= 1000000000000) {
			value /= 1000000000000;
			ext = "T";
		} else if (value >= 1000000000) {
			value /= 1000000000;
			ext = "B";
		} else if (value >= 1000000) {
			value /= 1000000;
			ext = "M";
		} else if (value >= 1000) {
			value /= 1000;
			ext = "K";
		}
	}

	value = parseFloat(value).toFixed(Decimals);

	if (Comma) {
  let end = value.indexOf('.');
  if (end === -1) {
			end = value.length;
		}
		if (end > 3) {
			const parts = [];
   const fraction = value.substring(end);

   let i = end - 3;
   for (; i > 0; i -= 3) {
				parts.push(value.substring(i,i + 3));
			}
			parts.push(value.substring(0,i+3));
			value = parts.reverse().join(",") + fraction;
		}
	}
	res.push(value);
	res.push(ext);
	if (Suffix !== null) {
		res.push(Suffix);
	}
	return res.join("");
}

export default formatNumber;
