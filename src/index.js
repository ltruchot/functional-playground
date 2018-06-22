// --- LAMBDA CALCULUS COMBINATORS
const identity = a => a; // I (Idiot / Cacatoès)
console.log(identity(42));

const selfApplication = f => f(f); // M (Mockingbird / Moqueur)
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
const hold = n => k => k(n); // Th (Thrush / Turdidae)
console.log('hold(first)(identity)', hold(first)(identity));
// and Th is CI
let holdDemo = (f => a => b => f(b)(a))(e => e);
holdDemo = a => b => (e => e)(b)(a);
holdDemo = a => b => b(a);
console.log('holdDemo(first)(identity)', holdDemo(first)(identity));

const holdPair = a => b => f => f(a)(b); // (Vireo / Vireo), using closure as datastructure
// for example this pair, ready to give back those 2 args to any function
const pair = holdPair(identity)(selfApplication);
// now get "identity"
console.log('pair(first)', pair(first));
// now get "selfApplication"
console.log('pair(second)', pair(second));

// EMPTY
const λEmpty = a => a;

// --- BOOLEANS
const λTrue = a => b => a; // is first, K, Kestrel
const λFirst = λTrue;
λTrue.inspect = () => "it's true";
console.log(λTrue);
// give param A to a function, that return a function that can take any params, that return A
// value => any => value
const λFalse = a => b => b; // is second, KI, Kite
const λSecond = λFalse;
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
let λNotDemo = f => f(a => b => b)(c => d => c);
// that will execute this function, with (a => b => b) as param
λNotDemo = (x => y => x)(a => b => b);
// so we get
λNotDemo = y => a => b => b;
// that will execute this function wirth (c => d => c) as param
λNotDemo = (y => a => b => b)(c => d => c);
// and that will get the (c => d => c) param
λNotDemo = a => b => b;
// no concern (c => d => c)
console.log((f => f(a => b => b)(c => d => c))(x => y => x).toString());

// decompose : λNot(λFalse)
// give a 2 level function (x => y => y) to the following function
λNotDemo = f => f(a => b => b)(c => d => c);
// that will execute this function, with (a => b => b) as param
λNotDemo = x => y => y;
// so we get
λNotDemo = y => y;
// that will execute this function wirth (c => d => c) as param
λNotDemo = (y => y)(c => d => c);
// and that will get the (c => d => c) param
λNotDemo = c => d => c;
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
let λAndDemo = (a => b => a(b)(a))(c => d => c)(e => f => e);
λAndDemo = (b => (c => d => c)(b)(g => h => g))(e => f => e);
λAndDemo = (c => d => c)(e => f => e)(g => h => g);
λAndDemo = (d => e => f => e)(g => h => g);
λAndDemo = e => f => e; // is λTrue

// lets decompose λAnd(λTrue)(λFalse)
λAndDemo = (a => b => a(b)(a))(c => d => c)(e => f => f);
λAndDemo = (b => (c => d => c)(b)(g => h => g))(e => f => f);
λAndDemo = (c => d => c)(e => f => f)(g => h => g);
λAndDemo = e => f => f; // is λFalse

// OR
const λOr = a => b => a(a)(b); // is selfApplication M (Mockingbird / Rossignol)
// so (true || true) === true
console.log('λOr(λTrue)(λTrue):', λOr(λTrue)(λTrue));
// and so on
console.log('λOr(λTrue)(λFalse):', λOr(λTrue)(λFalse));
console.log('λOr(λFalse)(λTrue):', λOr(λFalse)(λTrue));
console.log('λOr(λFalse)(λFalse):', λOr(λFalse)(λFalse));

// lets decompose decompose λOr(λTrue)(λFalse)
let λOrDemo = (a => b => a(a)(b))(c => d => c)(e => f => f);
λOrDemo = (b => (c => d => c)(g => h => g)(b))(e => f => f);
λOrDemo = (c => d => c)(g => h => g)(e => f => f);
λOrDemo = g => h => g; // is λTrue

// BOOL EQUALITY
const λBoolEquality = a => b => a(b)(λNot(b));
// so true === true
console.log('λBoolEquality(λTrue)(λTrue):', λBoolEquality(λTrue)(λTrue));
// and so on
console.log('λBoolEquality(λTrue)(λFalse):', λBoolEquality(λTrue)(λFalse));
console.log('λBoolEquality(λFalse)(λFalse):', λBoolEquality(λFalse)(λFalse));
console.log('λBoolEquality(λTrue)(λFalse):', λBoolEquality(λFalse)(λTrue));

// lets decompose decompose λBoolEquality(λFalse)(λFalse)
let λBoolEqualityDemo = (a => b => a(b)((c => c(d => e => e)(f => g => f))(b)))(
  h => i => i,
)(j => k => k);
λBoolEqualityDemo = (b =>
  (h => i => i)(b)((c => c(d => e => e)(f => g => f))(b)))(j => k => k);
λBoolEqualityDemo = (h => i => i)(j => k => k)(
  (c => c(d => e => e)(f => g => f))(j => k => k),
);
λBoolEqualityDemo = (j => k => k)(d => e => e)(f => g => f);
λBoolEqualityDemo = (k => k)(f => g => f);
λBoolEqualityDemo = f => g => f; // is λTrue

// NUMBERS (chuch numerals)
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
let λSuccessor = n => f => a => f(n(f)(a));
console.log(λSuccessor(λZero)(λNot)(λTrue)); // is false

// for debug purpose
const jsnum = n => n(x => x + 1)(0);
console.log(jsnum(λSuccessor(λSuccessor(λSuccessor(λTwice))))); // 3th successor of 2 is 5

// decompose successor of 1
let λSuccessorDemo = (a => b => c => b(a(b)(c)))(d => e => d(e));
λSuccessorDemo = b => c => b(b(c));
λSuccessorDemo = jsnum(b => c => b(b(c)));
console.log('λSuccessorDemo', λSuccessorDemo); // is 2
// or more explicitely
λSuccessorDemo = (n => n(x => x + 1)(0))(b => c => b(b(c)));
λSuccessorDemo = (x => x + 1)((x => x + 1)(0));
λSuccessorDemo = (x => x + 1)(0) + 1;
λSuccessorDemo = 0 + 1 + 1;
console.log('λSuccessorDemo', λSuccessorDemo); // is 2

// COMPOSE
const λCompose = f => g => a => f(g(a)); // B (Bluebird / Merlebleu)
console.log(
  'λCompose(λNot)(λNot)(λTrue) === λTrue:',
  λCompose(λNot)(λNot)(λTrue) === λTrue,
);

// decompose λCompose(λNot)(λNot)(λTrue)
let λComposeDemo = (a => b => c => a(b(c)))(d => d(e => f => f)(g => h => g))(
  i => i(j => k => k)(l => m => l),
)(n => o => n);
λComposeDemo = (b => c => (d => d(e => f => f)(g => h => g))(b(c)))(i =>
  i(j => k => k)(l => m => l),
)(n => o => n);
λComposeDemo = (c =>
  (d => d(e => f => f)(g => h => g))((i => i(j => k => k)(l => m => l))(c)))(
  n => o => n,
);
λComposeDemo = (d => d(e => f => f)(g => h => g))(
  (i => i(j => k => k)(l => m => l))(n => o => n),
);
λComposeDemo = (i => i(j => k => k)(l => m => l))(n => o => n)(e => f => f)(
  g => h => g,
);
λComposeDemo = (n => o => n)(j => k => k)(l => m => l)(e => f => f)(g => h =>
  g,
);
λComposeDemo = g => h => g; // is true (K)

// so let's compose something usefull
console.log(
  'λCompose(jsnum)(λSuccessor)(λFiveFold)',
  λCompose(jsnum)(λSuccessor)(λFiveFold),
); // log 6 !

// a better version of λSuccessor is now available
// remember n => f => a => f(n(f)(a)) ?
λSuccessor = n => f => λCompose(f)(n(f));

// ADD
// so 2 + 2 is twice successor of 2
const λAdd = n => k => n(λSuccessor)(k);
console.log(jsnum(λAdd(λFiveFold)(λTwice)));

// MULTIPLY
// so 2 * 3 is twice the thrice of 1
let λMultiply = n => k => f => n(k(f));
// sa basically
λMultiply = λCompose; // alpha equivalent
console.log(
  'jsnum(λMultiply(λTwice)(λThrice))',
  jsnum(λMultiply(λTwice)(λThrice)),
);

// EXPONENTIATION
// so 2^3 = 8, is 2 x 2 x 2, only a composition of twices one by one
const λPow = n => k => k(n); // is a simple Th (Thrush) that hold and arg
console.log('jsnum(λPow(λThrice)(λTwice))', jsnum(λPow(λThrice)(λTwice)));
// and Th is CI (hold is reverseArgs of identity) !

// IS ZERO
// λTrue(λFalse)) returns always λFalse,
// if n(λTrue(λFalse)) don't do nothing (0 case), we want λTrue
const λIsZero = n => n(λTrue(λFalse))(λTrue);
console.log('λIsZero(λZero)', λIsZero(λZero));
console.log('λIsZero(λTwice)', λIsZero(λTwice));
console.log('λIsZero(λFourFold)', λIsZero(λFourFold));

// PAIRS
const λPair = a => b => f => f(a)(b);

// The problem:
// 	define functions range, map, reverse and foreach, obeying the restrictions below,
// such that the following program works properly. It prints the squares of numbers from 1 to 10, in reverse order.

// Restrictions:
// 	- You must not use arrays. The square bracket characters, [ and ], are forbidden, as well as new Array.
// 	- You must not use objects. The curly braces, { and }, and the dot character (.) are forbidden.
//      You may use curly braces for code blocks, but not for creating JavaScript objects.
// 	- Should go without saying, these functions must be generic and do what their name implies.
//      They must not be hard-coded for the particular 1..10 example.

const successor = a => a + 1;
//let list = λPair(0)(λPair(1)(λPair(2)(3)));
// console.log('list', list(λSecond)(λSecond)(λFirst));
const range = (a, b, list) => {
  const next = successor(a);
  // head
  if (!list) {
    return range(next, b, λPair(a));
  }
  // body
  if (a < b - 1) {
    return range(next, b, λCompose(list)(λPair(a)));
  }
  // tail
  return list(λPair(a)(next));
};

const map = (list, f, newList) => {
  // head
  if (!newList) {
    return map(list(λSecond), f, λPair(f(list(λFirst))));
  }
  // tail
  if (typeof list === 'number') {
    return newList(f(list));
  }
  // body
  return map(list(λSecond), f, λCompose(newList)(λPair(f(list(λFirst)))));
};

const tail = list => {
  return typeof list === 'function' ? tail(list(λSecond)) : list;
};
const pop = (list, next, newList) => {
  if (!next) {
    return pop(list(λSecond), list(λFirst));
  } else {
    if (typeof list === 'function') {
      newList = newList ? λCompose(newList)(λPair(next)) : λPair(next);
      return pop(list(λSecond), list(λFirst), newList);
    }
    return newList ? newList(next) : next;
  }
};

const reverse = (list, newList) => {
  if (typeof list === 'function') {
    if (!newList) {
      newList = λPair(tail(list));
    } else {
      newList = λCompose(newList)(λPair(tail(list)));
    }
    return reverse(pop(list), newList);
  }
  return λCompose(newList)(λPair(tail(list)));
};

const foreach = (list, f) => {
  if (typeof list(λSecond)(λFirst) === 'number') {
    f(list(λSecond)(λFirst));
    if (typeof list(λSecond) === 'function') {
      return foreach(list(λSecond), f);
    }
  }
};

var numbers = range(1, 10);
numbers = map(numbers, n => n * n);
numbers = reverse(numbers);
foreach(numbers, console.log);

// output:
// 100
// 81
// 64
// 49
// 36
// 25
// 16
// 9
// 4
// 1
