import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        slug: 'sum-of-even',
        description: `## Sum of Even Numbers

Given an array of integers, return the sum of all even numbers in the array.

### Input Format
- First line: \`N\` (number of elements)  
- Second line: \`N\` space-separated integers

### Output Format
- A single integer — the **sum of even numbers**

### Constraints
- \`1 ≤ N ≤ 10^5\`  
- \`-10^9 ≤ arr[i] ≤ 10^9\`

### Example

**Input**
\`\`\`
5
1 2 3 4 5
\`\`\`

**Output**
\`\`\`
6
\`\`\`
`,
        codeSnippet: `def sum_of_even(arr):\n    ## Your implementation here!\n`
      },
      {
        slug: 'palindrome-check',
        description: `## Palindrome Check

Check whether a given string is a palindrome.

### Input Format
- A single line: a string \`s\`

### Output Format
- \`True\` if the string is a palindrome, otherwise \`False\`

### Constraints
- \`1 ≤ len(s) ≤ 10^5\`
- Input string will only contain lowercase alphabets.

### Example

**Input**
\`\`\`
racecar
\`\`\`

**Output**
\`\`\`
True
\`\`\`
`,
        codeSnippet: `def isPalindrome(s):\n    ## Your implementation here!\n`
      },
      {
        slug: 'three-sum',
        description: `## 3Sum Problem

Given an array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i ≠ j ≠ k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

### Input Format
- First line: \`N\` (number of elements)
- Second line: \`N\` space-separated integers

### Output Format
- List of triplets (in any order), each on a new line

### Constraints
- \`3 ≤ N ≤ 10^3\`
- \`-10^5 ≤ nums[i] ≤ 10^5\`

### Example

**Input**
\`\`\`
6
-1 0 1 2 -1 -4
\`\`\`

**Output**
\`\`\`
[-1, -1, 2]
[-1, 0, 1]
\`\`\`
`,
        codeSnippet: `def three_sum(nums):\n    ## Your implementation here!\n`
      },
      {
        slug: 'roman-to-integer',
        description: `## Roman to Integer

Convert a Roman numeral to an integer.

### Input Format
- A single line: a Roman numeral string \`s\`

### Output Format
- An integer representing the Roman numeral

### Constraints
- \`1 ≤ len(s) ≤ 15\`
- \`s\` is guaranteed to be a valid Roman numeral in the range \`[1, 3999]\`

### Example

**Input**
\`\`\`
XIV
\`\`\`

**Output**
\`\`\`
14
\`\`\`
`,
        codeSnippet: `def romanToInt(s):\n    ## Your implementation here!\n`
      }
    ],
    skipDuplicates: true,
  });

  console.log("Problems seeded successfully!");
}



main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })