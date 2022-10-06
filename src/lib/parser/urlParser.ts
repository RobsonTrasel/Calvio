import T from './utils/atomicParser';
import C from './utils/combinatorsParse';
import M from './utils/modifiersParse';

const protocol = C.sequenceOf([
	C.choice([T.str('https'), T.str('http')]),
	T.str('://'),
]);

const www = T.str('www.');

const domain = T.letters;

const dotCom = C.sequenceOf([T.str('.'), T.letters]);

const endpoint = M.atLeastOne(C.sequenceOf([T.str('/'), T.letters]));

const queryString = C.sequenceOf([
	C.choice([T.str('?'), T.str('&')]),
	T.letters,
	T.str('='),
	T.lettersOrDigits,
]);

const url = M.transform(
	C.sequenceOf([
		M.maybe(protocol),
		M.maybe(www),
		domain,
		M.atLeastOne(dotCom),
		M.maybe(endpoint),
		M.maybeSome(queryString),
	]),
	({ result }) => {
		const flattenedString = result.toString().replace(/,/g, '');
		console.log(flattenedString);
		return flattenedString;
	}
);

export default url;