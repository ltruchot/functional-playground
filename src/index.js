// --- LAMBDA CALCULUS COMBINATORS
const identity = a => a; // I (Idiot / Cacatoès)
console.log(identity(42));

const selfApplication = f => f(f); // M (Mockingbird / Rossignol)
console.log(selfApplication(identity) === identity);

const first = a => b => a; // K (Kestrel / Crécerelle), is a kind of "constant"
const test = first('test');
console.log(test('try change'));

const second = a => b => b; // KI (Kite / Faucon)
console.log(second('test 1')('test 2'));
console.log(first(identity)('test 1')('test 2'));

const reverseArgs = f => a => b => f(b)(a); // C (Cardinal / Cardinal)
console.log(
  'reverseArgs(first)(identity)(selfApplication) === selfApplication:',
  reverseArgs(first)(identity)(selfApplication) === selfApplication,
);

const compose = f => g => a => f(g(a)); // B (Bluebird / Merlebleu)
console.log(
  'compose(identity(second)(first) === first:',
  compose(identity)(second)(first) === second,
);

// --- BOOLEANS
const λTrue = a => b => a; // is first, K, Kestrel
λTrue.inspect = () => "it's true";
console.log(λTrue);
// give param A to a function, that return a function that can take any params, that return A
// value => any => value
const λFalse = a => b => b; // is second, KI, Kite
λFalse.inspect = () => "it's false";
console.log(λFalse);
// give any param to a function, that return a function that take a B param, and that return B
// any => value => value

// --- BOOLEAN OPERATIONS

// NOT
const λNot = f => f(λFalse)(λTrue); // related to C (Cardinal / Cardinal)
console.log(λNot(λTrue), λNot(λFalse));
// decompose : λNot(λTrue)
// give a 2 level function (x => y => x) to the following function
const λNotDemo0 = f => f(a => b => b)(c => d => c);
// that will execute this function, with (a => b => b) as param
const λNotDemo1 = (x => y => x)(a => b => b);
// so we get
const λNotDemo2 = y => a => b => b;
// that will execute this function wirth (c => d => c) as param
const λNotDemo2bis = (y => a => b => b)(c => d => c);
// and that will get the (c => d => c) param
const λNotDemo3 = a => b => b;
// no concern (c => d => c)
console.log((f => f(a => b => b)(c => d => c))(x => y => x).toString());

// decompose : λNot(λFalse)
// give a 2 level function (x => y => y) to the following function
const λNotDemo4 = f => f(a => b => b)(c => d => c);
// that will execute this function, with (a => b => b) as param
const λNotDemo5 = x => y => y;
// so we get
const λNotDemo6 = y => y;
// that will execute this function wirth (c => d => c) as param
const λNotDemo6bis = (y => y)(c => d => c);
// and that will get the (c => d => c) param
const λNotDemo7 = c => d => c;
// no concern for (a => b => b)
console.log((f => f(a => b => b)(c => d => c))(x => y => y).toString());

// So, nothing change: it's an advanced form of reverseArgs (C, Cardinal)
// take a function, then 2 args, and flip them
console.log(reverseArgs(λTrue)(λTrue)(λFalse)); // it's false
console.log(reverseArgs(λFalse)(λTrue)(λFalse)); // it's true

reverseArgs(λTrue); // is (a => b => (x => y => x)(b)(a)))
reverseArgs(λTrue)(λTrue)(λFalse); // is (x => y => x)(a => b => b)(c => d => c)
// or an other "false is true"
λNot(λTrue); // is (f => f(a => b => b)(c => d => c)(x => y => x);
// so it's (x => y => x)(a => b => b)(c => d => c);
// or an other "false is true"

// AND
const λAnd = a => b => a(b)(a);
// so (true && true) === true
console.log('λAnd(λTrue)(λTrue):', λAnd(λTrue)(λTrue));
// and so on
console.log('λAnd(λTrue)(λFalse):', λAnd(λTrue)(λFalse));
console.log('λAnd(λFalse)(λTrue):', λAnd(λFalse)(λTrue));
console.log('λAnd(λFalse)(λFalse):', λAnd(λFalse)(λFalse));
// lets decompose λAnd(λTrue)(λTrue)
const λAndDemo1 = (a => b => a(b)(a))(c => d => c)(e => f => e);
const λAndDemo2 = (b => (c => d => c)(b)(g => h => g))(e => f => e);
const λAndDemo3 = (c => d => c)(e => f => e)(g => h => g);
const λAndDemo4 = (d => e => f => e)(g => h => g);
const λAndDemo5 = e => f => e; // is λTrue

// lets decompose λAnd(λTrue)(λFalse)
const λAndDemo6 = (a => b => a(b)(a))(c => d => c)(e => f => f);
const λAndDemo7 = (b => (c => d => c)(b)(g => h => g))(e => f => f);
const λAndDemo8 = (c => d => c)(e => f => f)(g => h => g);
const λAndDemo9 = e => f => f; // is λFalse

// OR
const λOr = a => b => a(a)(b); // is selfApplication M (Mockingbird / Rossignol)
// so (true || true) === true
console.log('λOr(λTrue)(λTrue):', λOr(λTrue)(λTrue));
// and so on
console.log('λOr(λTrue)(λFalse):', λOr(λTrue)(λFalse));
console.log('λOr(λFalse)(λTrue):', λOr(λFalse)(λTrue));
console.log('λOr(λFalse)(λFalse):', λOr(λFalse)(λFalse));

// lets decompose decompose λOr(λTrue)(λFalse)
const λOrDemo1 = (a => b => a(a)(b))(c => d => c)(e => f => f);
const λOrDemo2 = (b => (c => d => c)(g => h => g)(b))(e => f => f);
const λOrDemo3 = (c => d => c)(g => h => g)(e => f => f);
const λOrDemo4 = g => h => g; // is λTrue

// BOOL EQUALITY
const λBoolEquality = a => b => a(b)(λNot(b));
// so true === true
console.log('λBoolEquality(λTrue)(λTrue):', λBoolEquality(λTrue)(λTrue));
// and so on
console.log('λBoolEquality(λTrue)(λFalse):', λBoolEquality(λTrue)(λFalse));
console.log('λBoolEquality(λFalse)(λFalse):', λBoolEquality(λFalse)(λFalse));
console.log('λBoolEquality(λTrue)(λFalse):', λBoolEquality(λFalse)(λTrue));

// lets decompose decompose λBoolEquality(λFalse)(λFalse)
const λBoolEqualityDemo1 = (a => b =>
  a(b)((c => c(d => e => e)(f => g => f))(b)))(h => i => i)(j => k => k);
const λBoolEqualityDemo2 = (b =>
  (h => i => i)(b)((c => c(d => e => e)(f => g => f))(b)))(j => k => k);
const λBoolEqualityDemo3 = (h => i => i)(j => k => k)(
  (c => c(d => e => e)(f => g => f))(j => k => k),
);
const λBoolEqualityDemo4 = (j => k => k)(d => e => e)(f => g => f);
const λBoolEqualityDemo5 = (k => k)(f => g => f);
const λBoolEqualityDemo6 = f => g => f; // is λTrue

// NUMBERS
const λZero = a => b => b; // is KI (false),  apply func one time to val
console.log(λZero(λNot)(λTrue)); // 0*not(true) is true
const λOnce = a => b => a(b); // is I (identity),  apply func one time to val
console.log(λOnce(λNot)(λTrue)); // 1*not(true) is false
const λTwice = a => b => a(a(b)); // apply func 2 times to val
console.log(λTwice(λNot)(λTrue)); // 2*not(true) is true
const λThrice = a => b => a(a(a(b))); // apply func 3 times to val
console.log(λThrice(λNot)(λTrue)); // 3*not(true) is false
// and so on
const λFourFold = a => b => a(a(a(a(b)))); // apply func 4 times to val
const λFiveFold = a => b => a(a(a(a(a(b))))); // apply func 5 times to val
// and finally
const λSuccessor = n => f => a => f(n(f)(a));
console.log(λSuccessor(λZero)(λNot)(λTrue)); // is false

// for debug purpose
const jsnum = n => n(x => x + 1)(0);
console.log(jsnum(λSuccessor(λSuccessor(λSuccessor(λTwice))))); // 3th successor of 2 is 5

// COMPOSE
const λCompose = f => g => a => f(g(a)); // B (Bluebird / Merlebleu)
console.log(
  'λCompose(λNot)(λNot)(λTrue) === λTrue:',
  λCompose(λNot)(λNot)(λTrue) === λTrue,
);
