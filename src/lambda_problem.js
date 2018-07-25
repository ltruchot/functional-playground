// ------ PROBLEM ------
// 	define functions range, map, reverse and foreach, obeying the restrictions below,
// such that the following program works properly. It prints the squares of numbers from 1 to 10, in reverse order.

// Restrictions:
// 	- You must not use arrays. The square bracket characters, [ and ], are forbidden, as well as new Array.
// 	- You must not use objects. The curly braces, { and }, and the dot character (.) are forbidden.
//      You may use curly braces for code blocks, but not for creating JavaScript objects.
// 	- Should go without saying, these functions must be generic and do what their name implies.
//      They must not be hard-coded for the particular 1..10 example.

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

// ------ SOLUTION OF LOIC ------

// PURE FUNCTIONAL HELPERS
const λTrue = a => b => a; // K (Kestrel / Crécerelle)
const λFirst = λTrue;

const λFalse = a => b => b; // KI (Kite / Faucon)
const λSecond = λFalse;

const λCompose = f => g => a => f(g(a)); // B (Bluebird / Merlebleu)
const λAppend = λCompose;

const λPair = a => b => f => f(a)(b); // V (Vireo / Vireo)

// OTHERS HELPERS
/**
 * Get the succcessor of any integer
 * @param {number} n
 */
const successor = n => n + 1;
const is = t => a => typeof a === t;
const isFunction = is('function');
const isUndefined = is('undefined');

/**
 * Get the second element of the last pair of a functionnal list
 * @param {λList} list
 */
const tail = list => {
  return isFunction(list) ? tail(list(λSecond)) : list;
};
/**
 * Get the first element of the first pair of a functionnal list
 * @param {λList} list
 */
const head = list => {
  return list(λFirst);
};
/**
 * Get a functionnal list without it last element
 * @param {λList} list
 * @param {*} next
 * @param {λList} newList
 */
const pop = (list, next, newList) => {
  //console.log('pop', list, next, newList);
  if (isUndefined(next)) {
    return pop(list(λSecond), list(λFirst));
  } else {
    if (isFunction(list)) {
      newList = newList ? λCompose(newList)(λPair(next)) : λPair(next);
      return pop(list(λSecond), list(λFirst), newList);
    }
    return newList ? newList(next) : next;
  }
};

// PROBLEM RELATED FUNCTIONS
/**
 * Get a chained list of functionnal pairs
 * @param {number} a
 * @param {number} b
 * @param {λList} newList
 */
const range = (a, b, newList) => {
  const next = successor(a);
  // head
  if (isUndefined(newList)) {
    return next === b ? λPair(a)(b) : range(next, b, λPair(a));
  }
  // body

  return a < b - 1
    ? range(next, b, λAppend(newList)(λPair(a)))
    : newList(λPair(a)(next));
};

const map = (list, f, newList) => {
  return isFunction(list)
    ? map(
        list(λSecond),
        f,
        newList
          ? λAppend(newList)(λPair(f(list(λFirst))))
          : λPair(f(list(λFirst))),
      )
    : newList(f(list));
};

const reverse = (list, newList) =>
  isFunction(list)
    ? reverse(
        pop(list),
        newList ? λAppend(newList)(λPair(tail(list))) : λPair(tail(list)),
      )
    : newList(tail(list));

const foreach = (list, f) => {
  f(list(λFirst));
  return isFunction(list(λSecond))
    ? foreach(list(λSecond), f)
    : f(list(λSecond));
};

var numbers = range(1, 10);
numbers = map(numbers, n => n * n);
numbers = reverse(numbers);
foreach(numbers, console.log);

const toJsArray = (list, arr = []) => {
  return isFunction(list(λSecond))
    ? toJsArray(list(λSecond), [...arr, list(λFirst)])
    : [...arr, list(λFirst), list(λSecond)];
};
console.log('toJsArray', toJsArray(numbers));

// KIET METHODS
// const toJsArray2 = list =>
//   list((head, tail) => [head].concat(toJsArray(tail)), _ => []);
// console.log('toJsArray2', toJsArray2(numbers));
