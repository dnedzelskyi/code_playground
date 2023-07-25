namespace TrieTree {
  type TrieTreeNode<T> = {
    children: { [key: string]: TrieTreeNode<T> };
    value: T | null;
  };

  interface ITrieTree<T> {
    size: number;
    insert(key: string, value: T): void;
    delete(key: string): T | null;
    search(key: string): T | null;
    lookup(prefix: string): string[];
    print(): void;
  }

  class TrieTree<T> implements ITrieTree<T> {
    size: number = 1;
    root: TrieTreeNode<T>;

    constructor() {
      this.root = {
        children: {},
        value: null,
      };
    }

    insert(key: string, value: T): void {
      let node = this.root;

      for (let char of key) {
        if (!(char in node.children)) {
          node.children[char] = { children: {}, value: null };
          this.size++;
        }
        node = node.children[char];
      }

      node.value = value;
    }

    delete(key: string): T | null {
      const [value] = this.deleteNode(this.root, key, 0);

      return value;
    }

    private deleteNode(node: TrieTreeNode<T>, key: string, i: number): [T | null, boolean] {
      // Reach our last node for the key. Return value and delete indicator.
      if (key.length === i) {
        const value = node.value;

        // Clear out value in any case.
        node.value = null;

        return [value, Object.keys(node.children).length === 0];
      }

      const char = key[i];
      // Move to the next node if char exists otherwise nothing to delete.
      const [value, canDelete] =
        char in node.children ? this.deleteNode(node.children[char], key, i + 1) : [null, false];

      if (canDelete) {
        delete node.children[char];
        this.size--;
      }

      return [value, canDelete && Object.keys(node.children).length === 0];
    }

    search(key: string): T | null {
      const node = this.searchNode(key);

      return node?.value ?? null;
    }

    private searchNode(key: string): TrieTreeNode<T> | null {
      let node = this.root;

      for (let char of key) {
        node = node?.children?.[char];
        if (!node) {
          return null;
        }
      }

      return node;
    }

    lookup(prefix: string): string[] {
      const list: string[] = [];
      const node = this.searchNode(prefix);

      // Return empty list if key with such prefix doesn't exist
      if (node === null) return list;

      // Perform a depth-first search to make suggestions.
      this.dfs(node, prefix, list);

      return list;
    }

    private dfs(node: TrieTreeNode<T>, word: string, list: string[]) {
      if (node.value) {
        list.push(word);
      }

      for (const char in node.children) {
        this.dfs(node.children[char], word + char, list);
      }
    }

    print(): void {
      console.log(`Tree size: ${this.size}`);

      let items: { char: string; node: TrieTreeNode<T> }[] = [{ char: '*', node: this.root }];

      while (items.length) {
        let level = '';
        let nextItems: { char: string; node: TrieTreeNode<T> }[] = [];
        for (const item of items) {
          level += ` (${item.char} | ${item.node.value})`;
          for (const key in item.node.children) {
            nextItems.push({ char: key, node: item.node.children[key] });
          }
        }
        console.log(level);
        items = nextItems;
      }
    }
  }

  console.log(':: Trie Tree Test ::');
  console.log('');

  console.log('Create new Trie Tree.');
  const trieTree: ITrieTree<number> = new TrieTree<number>();
  trieTree.print();
  console.log('');

  console.log('Insert new node to the Tree.');
  trieTree.insert('Alex', 25);
  trieTree.insert('Alexa', 61);
  trieTree.insert('Alice', 17);
  trieTree.insert('Dexter', 36);
  trieTree.insert('Pamela', 57);
  trieTree.insert('Ali', 21);
  trieTree.insert('Alexis', 32);
  trieTree.print();
  console.log('');

  console.log('Lookup Tree.');
  console.log(`Lookup for Ale: [${trieTree.lookup('Ale')}]`);
  console.log(`Lookup for Jes: [${trieTree.lookup('Jes')}]`);
  console.log(`Lookup for Ali: [${trieTree.lookup('Ali')}]`);
  console.log(`Lookup for Pa: [${trieTree.lookup('Pa')}]`);
  console.log('');

  console.log('Delete key for the Tree.');
  console.log(`Delete Alexa: ${trieTree.delete('Alexa')}`);
  trieTree.print();
  console.log(`Delete Alex: ${trieTree.delete('Alex')}`);
  trieTree.print();
  console.log(`Delete Alexis: ${trieTree.delete('Alexis')}`);
  trieTree.print();
  console.log('');

  console.log('Search by key.');
  console.log(`Search for Alexis: ${trieTree.search('Alexis')}`);
  console.log(`Search for Jessica: ${trieTree.search('Jessica')}`);
  console.log(`Search for Dexter: ${trieTree.search('Dexter')}`);
  console.log('');
}
