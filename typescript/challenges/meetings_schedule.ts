namespace MeetingsSchedule {
  /*
    Given:
      Person unordered meeting schedule [[st1, et1], [st2, et2], ... , [stN, etN]] for one day.
      Where st - meeting start time, et - meeting end time such as 0 <= st < et.
      Treat st and et as some plain integer numbers.
    Task:
      Verify if Person would be able to attend all meetings during the day.
      A person is not allowed to attend several meetings at the same time.
      In other words, check if there are no overlaps between meetings.
    Examples:
      #1
      Schedule : [[6, 15], [16, 18], [0, 10], [20, 24]]
      Answer: False, Because [0, 10] overlaps with [6, 15];
      
      #2
      Schedule : [[1, 5], [11, 14], [6, 7], [17, 21]]
      Answer: True, no overlaps.
  */

  // Approach #1 | time: O(n*log(n)) | space: O(1)
  // 1. Sort by start time 2. Verify overlaps for adjacent meetings.
  function checkSchedule1(schedule: number[][]): boolean {
    // Sort schedule array by start time.
    schedule.sort((a, b) => a[0] - b[0]);

    // Iterate and check overlaps for adjacent meetings.
    for (let i = 0; i + 1 < schedule.length; i++) {
      if (schedule[i][1] >= schedule[i + 1][0]) {
        return false;
      }
    }

    return true;
  }

  // Approach #2 | time: O(n + k) | space: O(n)
  // 1. Sort by start time using counting sort 2. Verify overlaps for adjacent meetings.
  function checkSchedule2(schedule: number[][]): boolean {
    // Sort by start time using counting sort

    // Setup
    let minStartTime = Infinity;
    let maxStartTime = -Infinity;
    for (let i = 0; i < schedule.length; i++) {
      maxStartTime = Math.max(maxStartTime, schedule[i][0]);
      minStartTime = Math.min(minStartTime, schedule[i][0]);
    }

    // Set counts.
    const counts = new Array(maxStartTime - minStartTime + 1).fill(0);
    for (let i = 0; i < schedule.length; i++) {
      counts[schedule[i][0] - minStartTime] += 1;
    }

    // Calculate indexes.
    let sum = 0;
    for (let i = 0; i < counts.length; i++) {
      const c = counts[i];
      counts[i] = sum;
      sum = sum + c;
    }

    const sortedSchedule: number[][] = new Array(schedule.length);
    for (let i = 0; i < schedule.length; i++) {
      const meeting = schedule[i];
      const index = counts[meeting[0] - minStartTime];
      sortedSchedule[index] = meeting;
      counts[meeting[0] - minStartTime] += 1;
    }

    // Iterate and check overlaps for adjacent meetings.
    for (let i = 0; i + 1 < sortedSchedule.length; i++) {
      if (sortedSchedule[i][1] >= sortedSchedule[i + 1][0]) {
        return false;
      }
    }

    return true;
  }

  let schedule: number[][];

  console.log(`:: Meetings Schedule Problem ::`);
  console.log();

  console.log(`--- Approach #1 ---`);
  console.log();

  schedule = [
    [6, 15],
    [16, 18],
    [0, 10],
    [20, 24],
  ];
  console.log(`Schedule:`);
  console.log(schedule);
  console.log(`Will be able to attend all meetings:`);
  console.log(checkSchedule1(schedule));
  console.log();

  schedule = [
    [1, 5],
    [11, 14],
    [6, 7],
    [17, 21],
  ];
  console.log(`Schedule:`);
  console.log(schedule);
  console.log(`Will be able to attend all meetings:`);
  console.log(checkSchedule1(schedule));
  console.log();

  console.log(`--- Approach #2 ---`);
  console.log();

  schedule = [
    [6, 15],
    [16, 18],
    [0, 10],
    [20, 24],
  ];
  console.log(`Schedule:`);
  console.log(schedule);
  console.log(`Will be able to attend all meetings:`);
  console.log(checkSchedule2(schedule));
  console.log();

  schedule = [
    [1, 5],
    [11, 14],
    [6, 7],
    [17, 21],
  ];
  console.log(`Schedule:`);
  console.log(schedule);
  console.log(`Will be able to attend all meetings:`);
  console.log(checkSchedule2(schedule));
  console.log();
}
