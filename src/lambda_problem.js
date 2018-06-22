// ------ PROBLEME ------
// 	define functions range, map, reverse and foreach, obeying the restrictions below,
// such that the following program works properly. It prints the squares of numbers from 1 to 10, in reverse order.

// Restrictions:
// 	- You must not use arrays. The square bracket characters, [ and ], are forbidden, as well as new Array.
// 	- You must not use objects. The curly braces, { and }, and the dot character (.) are forbidden.
//      You may use curly braces for code blocks, but not for creating JavaScript objects.
// 	- Should go without saying, these functions must be generic and do what their name implies.
//      They must not be hard-coded for the particular 1..10 example.

// ------ SOLUTION DE LOIC ------

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
 * Get the second element of the last pair of a functionnal list
 * aka last element
 * @param {λList} list
 */
const tail = list => {
  return typeof list === 'function' ? tail(list(λSecond)) : list;
};
/**
 * Get a functionnal list without it last element
 * @param {*} list
 * @param {*} next
 * @param {*} newList
 */
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

// PROBLEM RELATED METHODS
/**
 * Get the succcessor of any integer
 * @param {number} n
 */
const successor = n => n + 1;

/**
 * Get a chained list of functionnal pairs
 * @param {*} a
 * @param {*} b
 * @param {*} list
 */
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
