namespace DisjointSet {
  class DisjointSet<T> {
    private nodes = new Map<T, T>();
    private sizes = new Map<T, number>();

    get groups(): Map<T, T[]> {
      const groups = new Map<T, T[]>();
      for (let item of this.nodes.keys()) {
        const root = this.find(item);
        if (!groups.has(root)) groups.set(root, []);
        groups.get(root)!.push(item);
      }
      return groups;
    }

    find(item: T): T {
      // Add to nodes if not there and return.
      if (!this.nodes.has(item)) {
        this.nodes.set(item, item);
        this.sizes.set(item, 1);
      }

      // Is root.
      if (item === this.nodes.get(item)) {
        return item;
      }

      // Find root node and set it.
      let root = this.find(this.nodes.get(item)!);
      this.nodes.set(item, root);
      return root;
    }

    union(itemA: T, itemB: T) {
      // Get and check roots
      [itemA, itemB] = [this.find(itemA), this.find(itemB)];
      if (itemA === itemB) return;

      // Choose smallest group.
      if (this.sizes.get(itemA)! < this.sizes?.get(itemB)!) {
        [itemA, itemB] = [itemB, itemA];
      }

      // Merge
      this.nodes.set(itemB, itemA);
      this.sizes.set(itemA, this.sizes.get(itemA)! + this.sizes.get(itemB)!);
      this.sizes.delete(itemB);
    }

    connected(itemA: T, itemB: T): boolean {
      return this.find(itemA) === this.find(itemB);
    }
  }

  console.log(':: Disjoint-Set DS Test ::', '\n');

  const users = [
    { id: 1, name: 'User1' },
    { id: 2, name: 'User2' },
    { id: 3, name: 'User3' },
    { id: 4, name: 'User4' },
    { id: 5, name: 'User5' },
    { id: 6, name: 'User6' },
  ];
  const expectedGroups = new Map([
    [users[0], [users[0]]],
    [users[1], [users[1], users[2], users[3]]],
    [users[4], [users[4], users[5]]],
  ]);

  console.log(`Expected groups:`);
  console.log(expectedGroups, '\n');

  let disjointSet = new DisjointSet<(typeof users)[number]>();
  disjointSet.union(users[0], users[0]);
  disjointSet.union(users[1], users[2]);
  disjointSet.union(users[2], users[3]);
  disjointSet.union(users[4], users[5]);

  console.log(`Actual groups:`);
  console.log(disjointSet.groups, '\n');
}
