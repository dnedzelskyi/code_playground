namespace ConsistentHashing {
  /**
   * ConsistentHashing class provides a consistent hashing mechanism for distributing data across a set of nodes.
   *
   */
  class ConsistentHashing {
    private nodes = new Map<number, string>();
    private ring = new Array<number>();

    /**
     * Constructor.
     *
     * @param nodes -  Array of string representation of real nodes.
     * @param replicas - Desired number of virtual nodes for each real node.
     */
    constructor(nodes: string[], private replicas: number) {
      for (let node of nodes) {
        this.addNode(node);
      }
    }

    /**
     * Adds a node to the consistent hashing ring.
     *
     * @param node - The string representation of the real node to add.
     */
    addNode(node: string) {
      for (let r = 0; r < this.replicas; r++) {
        // Get hash code for node.
        const hashKey = ConsistentHashing.hash(`${node}|${r}`);

        // Register node.
        this.nodes.set(hashKey, node);

        // Add to hash ring.
        const i = this.lookup(hashKey);
        this.ring.splice(i, 0, hashKey);
      }
    }

    /**
     * Deletes a node from the consistent hashing ring.
     *
     * @param node - The string representation of the real node to delete.
     */
    deleteNode(node: string) {
      const del = new Set<number>();

      // Remove from nodes.
      for (let r = 0; r < this.replicas; r++) {
        const hashKey = ConsistentHashing.hash(`${node}|${r}`);
        if (this.nodes.has(hashKey)) {
          del.add(hashKey);
          this.nodes.delete(hashKey);
        }
      }

      // Remove from ring.
      this.ring = this.ring.filter((key) => !del.has(key));
    }

    /**
     * Retrieves the node associated with a given value.
     *
     * @param value - The value to retrieve the associated node for.
     * @returns The string representation of the node associated with the value, or undefined if not found.
     */
    getNode(value: string): string | undefined {
      // Take hash key for value and its position on the ring.
      let hashKey = ConsistentHashing.hash(value);
      let i = this.lookup(hashKey);

      // Adjust index if it's rage and get node hash key.
      i = i < this.ring.length ? i : 0;
      hashKey = this.ring[i];

      // Return node associated with value.
      return this.nodes.get(hashKey);
    }

    private lookup(key: number): number {
      let i = 0;
      while (i < this.ring.length && this.ring[i] < key) {
        i++;
      }
      return i;
    }

    private static hash(value: string): number {
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

    public toString(): string {
      return JSON.stringify(this);
    }
  }

  console.log(':: Consistent Hashing Test ::');
  console.log('');

  const servers = ['Server #1', 'Server #2', 'Server #3'];
  console.log(`Nodes: '${servers}'`);

  const consistentHashing = new ConsistentHashing(servers, 3);
  console.log(`Init:`);
  console.log(`Result:`);
  console.log(consistentHashing);
  console.log(``);

  const value = 'Test Value';
  console.log(`Find Node for Test Value:`);
  console.log(`Value: ${value}`);
  console.log(`Node: ${consistentHashing.getNode(value)}`);
  console.log(``);

  console.log(`Delete Node:`);
  console.log(`Node to delete: ${servers[1]}`);
  consistentHashing.deleteNode(servers[1]);
  console.log(`Result:`);
  console.log(consistentHashing);
  console.log(``);

  console.log(`Find Node for Test Value:`);
  console.log(`Value: ${value}`);
  console.log(`Node: ${consistentHashing.getNode(value)}`);
  console.log(``);

  console.log(`Add Node:`);
  console.log(`Node to add: ${servers[1]}`);
  consistentHashing.addNode(servers[1]);
  console.log(`Result:`);
  console.log(consistentHashing);
  console.log(``);

  console.log(`Find Node for Test Value:`);
  console.log(`Value: ${value}`);
  console.log(`Node: ${consistentHashing.getNode(value)}`);
  console.log(``);
}
