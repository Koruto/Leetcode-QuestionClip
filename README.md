# LeetCode QuestionClip

A Firefox add-on that allows you to effortlessly copy LeetCode question descriptions to your clipboard with custom formatting.

## Features

- **Easy Copying**: Quickly copy LeetCode question descriptions with desired Markdown formatting.

## Icon States

- **<img src="./icons/copy.png" alt="Save Icon" width="20"/> Save Icon**: Displayed when you are on a valid LeetCode problem URL and have the description tab active.
- **<img src="./icons/success.png" alt="Success Icon" width="20"/> Tick Mark**: Indicates that the question description has been successfully copied to the clipboard.
- **<img src="./icons/error.png" alt="Error Icon" width="20"/> Error Icon**: Signals an error occurred while copying. Refreshing the page may resolve the issue.
- **<img src="./icons/forbidden.png" alt="Forbidden Icon" width="20"/> Forbidden Icon**: Shown when the current URL is not a valid LeetCode problem description page.

## Usage

1. **Navigate** to a LeetCode problem URL.
2. **Click** on the **"Description"** tab to ensure the problem description is visible.
3. **Click** the extension icon to copy the description.
4. The icon will update to indicate the status:
   - **<img src="./icons/copy.png" alt="Save Icon" width="20"/> Save Icon**: Ready to copy.
   - **<img src="./icons/success.png" alt="Success Icon" width="20"/> Tick Mark**: Copy successful.
   - **<img src="./icons/error.png" alt="Error Icon" width="20"/> Error Icon**: Error occurred. Try refreshing the page.
   - **<img src="./icons/forbidden.png" alt="Forbidden Icon" width="20"/> Forbidden Icon**: Invalid URL. Ensure you are on a valid LeetCode problem description page.

## Examples

Below is an example of how the copied text will look with the desired Markdown formatting:

[1508. Range Sum of Sorted Subarray Sums](https://leetcode.com/problems/range-sum-of-sorted-subarray-sums/) You are given the array `nums`consisting of`n`positive integers. You computed the sum of all non-empty continuous subarrays from the array and then sorted them in non-decreasing order, creating a new array of`n \* (n + 1) / 2` numbers.

Return the sum of the numbers from index _`left`_ to index \_`right` (**indexed from 1**)*, inclusive, in the new array. *Since the answer can be a huge number return it modulo `109+ 7`.

**Example 1:**
**Input:** nums = [1,2,3,4], n = 4, left = 1, right = 5
**Output:** 13
**Explanation:** All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13.

**Example 2:**
**Input:** nums = [1,2,3,4], n = 4, left = 3, right = 4
**Output:** 6
**Explanation:** The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.

**Example 3:**
**Input:** nums = [1,2,3,4], n = 4, left = 1, right = 10
**Output:** 50

**Constraints:**

- `n == nums.length`
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 100`
- `1 <= left <= right <= n \* (n + 1) / 2`

## Best for Obsidian

- **Flashcards**: Ideal for creating flashcards in Obsidian, especially when using the [Obsidian_with_Anki](https://github.com/Pseudonium/Obsidian_to_Anki) plugin.
- **No Line Breaks**: Utilizes the emspace Unicode character to ensure no unwanted line breaks, preserving your formatting.

### Notes

- Ensure you are on a LeetCode problem URL ending with `/description/` for the extension to work correctly.
- In case of errors, try refreshing the page and ensure the problem description is visible.

### Credits

- Icons provided by [Flaticon](https://www.flaticon.com/packs/file-and-document-125).
