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
console.log(reverseArgs(first)(identity)(selfApplication) === selfApplication);

// --- BOOLEANS
const λTrue = a => b => a; // === first, K, Kestrel
λTrue.inspect = () => "it's true";
console.log(λTrue);
// give param A to a function, that return a function that can take any params, that return A
// value => any => value
const λFalse = a => b => b; // === second, KI, Kite
λFalse.inspect = () => "it's false";
console.log(λFalse);
// give any param to a function, that return a function that take a B param, and that return B
// any => value => value

// --- BOOLEAN OPERATIONS
// NOT
const λNot = f => f(λFalse)(λTrue);
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
console.log('λAnd(λTrue)(λTrue)', λAnd(λTrue)(λTrue));
// and so on
console.log('λAnd(λTrue)(λFalse)', λAnd(λTrue)(λFalse));
console.log('λAnd(λFalse)(λTrue)', λAnd(λFalse)(λTrue));
console.log('λAnd(λFalse)(λFalse)', λAnd(λFalse)(λFalse));
// lets decompose λAnd(λTrue)(λTrue)
const λAndDemo1 = (a => b => a(b)(a))(c => d => c)(e => f => e);
const λAndDemo2 = (b => (c => d => c)(b)(g => h => g))(e => f => e);
const λAndDemo3 = (c => d => c)(e => f => e)(g => h => g);
const λAndDemo4 = (d => e => f => e)(g => h => g);
const λAndDemo5 = e => f => e;

// lets decompose λAnd(λTrue)(λFalse)
console.log('tzeqt');
