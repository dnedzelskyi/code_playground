public class BinarySearch {
  private static boolean binarySearch(int[] arr, int target) {
    if (arr.length == 0) {
      return false;
    }

    int lo = 0;
    int hi = arr.length;

    while (lo <= hi) {
      int index = (lo + hi) / 2;
      int value = arr[index];

      if (value == target) {
        return true;
      } else if (value < target) {
        lo = index + 1;
      } else {
        hi = index - 1;
      }
    }

    return false;
  }

  public static void main(String[] args) {
    System.out.println(String.format("For input ([], 1) : %s", BinarySearch.binarySearch(new int[] {}, 1)));
    System.out.println(
        String.format("For input ([2, 7, 10, 11], 6) : %s", BinarySearch.binarySearch(new int[] { 2, 7, 10, 11 }, 6)));
    System.out.println(String.format("For input ([6], 6) : %s", BinarySearch.binarySearch(new int[] { 6 }, 6)));
    System.out.println(
        String.format("For input ([5, 12, 15], 15) : %s", BinarySearch.binarySearch(new int[] { 5, 12, 15 }, 15)));
    System.out.println(
        String.format("For input ([2, 7, 10, 11], 2) : %s", BinarySearch.binarySearch(new int[] { 2, 7, 10, 11 }, 2)));
    System.out.println(String.format("For input ([5, 9, 21, 33, 45, 61], 9) : %s",
        BinarySearch.binarySearch(new int[] { 5, 9, 21, 33, 45, 61 }, 9)));
  }
}