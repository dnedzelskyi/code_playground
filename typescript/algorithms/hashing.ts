namespace Hashing {
  /**
   * DJB2 (Bernstein's) hash function.
   * @param {string} value - string representation of hashing value.
   * @returns {number} hash value.
   */
  function dgb2Hash(value: string): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 33) ^ value.charCodeAt(i);
    }
    return hash >>> 0;
  }

  /**
   * FNV-1a (Fowler–Noll–Vo) hash function.
   * @param {string} value - string representation of hashing value.
   * @returns {number} hash value.
   */
  function fnv1aHash(value: string): number {
    // FNV offset basis for 32-bit hash
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash = hash ^ value.charCodeAt(i);
      hash = hash * 16777619; // 16777619 - FNV prime number for 32-bit hash.
    }
    return hash >>> 0;
  }

  /**
   * Jenkins One-at-a-Time hash function.
   * @param {string} value - string representation of hashing value.
   * @returns {number} hash value.
   */
  function jenkinsHash(value: string) {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
      hash += value.charCodeAt(i);
      hash += hash << 10;
      hash ^= hash >>> 6;
    }

    hash += hash << 3;
    hash ^= hash >>> 11;
    hash += hash << 15;

    return hash >>> 0;
  }

  console.log(':: Hashing Test ::');
  console.log('');

  const values = ['Hash me', 8191, true, null, [1, 5], [5, 1], undefined];

  console.log(':: dgb2Hash.');
  for (let val of values) {
    console.log(`Value: ${val} Type: ${typeof val}`);
    console.log(`Hash: ${dgb2Hash(String(val))}`);
  }
  console.log();

  console.log(':: fnv1aHash.');
  for (let val of values) {
    console.log(`Value: ${val} Type: ${typeof val}`);
    console.log(`Hash: ${fnv1aHash(String(val))}`);
  }
  console.log();

  console.log(':: jenkinsHash.');
  for (let val of values) {
    console.log(`Value: ${val} Type: ${typeof val}`);
    console.log(`Hash: ${jenkinsHash(String(val))}`);
  }
  console.log();
}
