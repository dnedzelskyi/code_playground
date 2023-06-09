public class LinearSearch {
    private static boolean linearSearch(int arr[], int value) {
        for (int item : arr) {
            if (item == value) {
                return true;
            }
        }

        return false;
    }

    public static void main(String args[]) {
        System.out.println(LinearSearch.linearSearch(new int[] { 5, 7, 1, 22 }, 1));
    }
}