import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
} from "@heroui/react";
import { FaCode } from "react-icons/fa";
import Navbar from "../components/Navbar";

export const problems = [
  {
    key: "1",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    key: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    topic: "Linked List",
    link: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    key: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Sliding Window",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    key: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
  {
    key: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/longest-palindromic-substring/",
  },
  {
    key: "6",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    topic: "String",
    link: "https://leetcode.com/problems/zigzag-conversion/",
  },
  {
    key: "7",
    title: "Reverse Integer",
    difficulty: "Medium",
    topic: "Math",
    link: "https://leetcode.com/problems/reverse-integer/",
  },
  {
    key: "8",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    topic: "String",
    link: "https://leetcode.com/problems/string-to-integer-atoi/",
  },
  {
    key: "9",
    title: "Palindrome Number",
    difficulty: "Easy",
    topic: "Math",
    link: "https://leetcode.com/problems/palindrome-number/",
  },
  {
    key: "10",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/regular-expression-matching/",
  },
  {
    key: "11",
    title: "Container With Most Water",
    difficulty: "Medium",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/container-with-most-water/",
  },
  {
    key: "12",
    title: "Integer to Roman",
    difficulty: "Medium",
    topic: "Math",
    link: "https://leetcode.com/problems/integer-to-roman/",
  },
  {
    key: "13",
    title: "Roman to Integer",
    difficulty: "Easy",
    topic: "Math",
    link: "https://leetcode.com/problems/roman-to-integer/",
  },
  {
    key: "14",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    topic: "String",
    link: "https://leetcode.com/problems/longest-common-prefix/",
  },
  {
    key: "15",
    title: "3Sum",
    difficulty: "Medium",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/3sum/",
  },
  {
    key: "16",
    title: "3Sum Closest",
    difficulty: "Medium",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/3sum-closest/",
  },
  {
    key: "17",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    topic: "Backtracking",
    link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
  },
  {
    key: "18",
    title: "4Sum",
    difficulty: "Medium",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/4sum/",
  },
  {
    key: "19",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    topic: "Linked List",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  },
  {
    key: "20",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    key: "21",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    topic: "Linked List",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    key: "22",
    title: "Generate Parentheses",
    difficulty: "Medium",
    topic: "Backtracking",
    link: "https://leetcode.com/problems/generate-parentheses/",
  },
  {
    key: "23",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topic: "Divide and Conquer",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
  },
  {
    key: "24",
    title: "Swap Nodes in Pairs",
    difficulty: "Medium",
    topic: "Linked List",
    link: "https://leetcode.com/problems/swap-nodes-in-pairs/",
  },
  {
    key: "25",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    topic: "Linked List",
    link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
  },
  {
    key: "26",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  },
  {
    key: "27",
    title: "Remove Element",
    difficulty: "Easy",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/remove-element/",
  },
  {
    key: "28",
    title: "Implement strStr()",
    difficulty: "Easy",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/implement-strstr/",
  },
  {
    key: "29",
    title: "Divide Two Integers",
    difficulty: "Medium",
    topic: "Math",
    link: "https://leetcode.com/problems/divide-two-integers/",
  },
  {
    key: "30",
    title: "Substring with Concatenation of All Words",
    difficulty: "Hard",
    topic: "Hash Table",
    link: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/",
  },
  {
    key: "31",
    title: "Next Permutation",
    difficulty: "Medium",
    topic: "Array",
    link: "https://leetcode.com/problems/next-permutation/",
  },
  {
    key: "32",
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/longest-valid-parentheses/",
  },
  {
    key: "33",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    key: "34",
    title: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    topic: "Binary Search",
    link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
  },
  {
    key: "35",
    title: "Combination Sum",
    difficulty: "Medium",
    topic: "Backtracking",
    link: "https://leetcode.com/problems/combination-sum/",
  },
  {
    key: "36",
    title: "First Missing Positive",
    difficulty: "Hard",
    topic: "Array",
    link: "https://leetcode.com/problems/first-missing-positive/",
  },
  {
    key: "37",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Two Pointers",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    key: "38",
    title: "Multiply Strings",
    difficulty: "Medium",
    topic: "Math",
    link: "https://leetcode.com/problems/multiply-strings/",
  },
  {
    key: "39",
    title: "Jump Game",
    difficulty: "Medium",
    topic: "Greedy",
    link: "https://leetcode.com/problems/jump-game/",
  },
  {
    key: "40",
    title: "Permutations",
    difficulty: "Medium",
    topic: "Backtracking",
    link: "https://leetcode.com/problems/permutations/",
  },
  {
    key: "41",
    title: "Rotate Image",
    difficulty: "Medium",
    topic: "Array",
    link: "https://leetcode.com/problems/rotate-image/",
  },
  {
    key: "42",
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Hash Table",
    link: "https://leetcode.com/problems/group-anagrams/",
  },
  {
    key: "43",
    title: "Pow(x, n)",
    difficulty: "Medium",
    topic: "Math",
    link: "https://leetcode.com/problems/powx-n/",
  },
  {
    key: "44",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/maximum-subarray/",
  },
  {
    key: "45",
    title: "Spiral Matrix",
    difficulty: "Medium",
    topic: "Array",
    link: "https://leetcode.com/problems/spiral-matrix/",
  },
  {
    key: "46",
    title: "Jump Game II",
    difficulty: "Hard",
    topic: "Greedy",
    link: "https://leetcode.com/problems/jump-game-ii/",
  },
  {
    key: "47",
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Array",
    link: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    key: "48",
    title: "Unique Paths",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/unique-paths/",
  },
  {
    key: "49",
    title: "Minimum Path Sum",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/minimum-path-sum/",
  },
  {
    key: "50",
    title: "Valid Sudoku",
    difficulty: "Medium",
    topic: "Hash Table",
    link: "https://leetcode.com/problems/valid-sudoku/",
  },
];

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "success";
    case "Medium":
      return "warning";
    case "Hard":
      return "danger";
    default:
      return "default";
  }
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 15;
  const pages = Math.ceil(problems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return problems.slice(start, end);
  }, [page]);

  return (
    <div className=" w-full h-full ">
      <Navbar />
      <div className=" flex justify-center items-center ">
        <span className="relative inline-flex sm:inline mt-24">
          <span className="bg-gradient-to-r from-[#ffef44] via-[#ff4a44] to-[#FF675E] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
          <span className="relative text-xl md:text-3xl  tracking-tighter text-center font-poppins">
            {" "}
            Practice Problems🔥{" "}
          </span>
        </span>
      </div>
      <Table
        aria-label="LeetCode Problems Table"
        className="p-1 md:p-4 mt-2 font-poppins "
        bottomContent={
          <div className="flex w-full justify-center ">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] bg-transparent shadow-none",
        }}
      >
        <TableHeader className="rounded-xl">
          <TableColumn className="text-lg rounded-l-xl">Title</TableColumn>
          <TableColumn className="text-lg">Topic</TableColumn>
          <TableColumn className="text-lg">Difficulty</TableColumn>
          <TableColumn className="text-lg rounded-r-xl">LeetCode</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell className=" text-medium md:text-lg ">
                {item.title}
              </TableCell>
              <TableCell>
                <Chip color="success" variant="dot">
                  {item.topic}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  className="min-w-20 rounded-md text-center text-sm font-bold"
                  color={getDifficultyColor(item.difficulty)}
                >
                  {item.difficulty}
                </Chip>
              </TableCell>
              <TableCell>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <FaCode className="text-blue-500 text-2xl" />
                </a>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
