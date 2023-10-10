/*
  Given:
    Some integer value x.
  Task:
    Find integer y such as y * y <= x.
  Examples:
    #1
    x : 0
    sqrt: 0
    
    #2
    x : 7
    sqrt: 2

    #3
    x : 64
    sqrt: 8
*/
public class SquareRoot {
  private static int squareRoot(int x) {
    if (x < 2) {
      return x;
    }

    int l = 1;
    int r = x / 2;

    while (l <= r) {
      int m = l + (r - l) / 2;

      if (m * m <= x) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }

    return r;
  }

  public static void main(String args[]) {
    int x = 0;
    System.out.printf("For x: %d sqrt(x) will be: %d%n", x, squareRoot(x));

    x = 7;
    System.out.printf("For x: %d sqrt(x) will be: %d%n", x, squareRoot(x));

    x = 64;
    System.out.printf("For x: %d sqrt(x) will be: %d%n", x, squareRoot(x));
  }
}
