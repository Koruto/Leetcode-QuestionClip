(function () {
  const extensionPrefix = '[Copy LeetCode Question]:';

  // Helper function to log message with colored prefix
  function logError(message) {
    console.error(
      `%c${extensionPrefix}%c ${message}`,
      'color: yellow',
      'color: inherit'
    );
  }

  function logSuccess(message) {
    console.log(
      `%c${extensionPrefix}%c ${message}`,
      'color: yellow',
      'color: inherit'
    );
  }

  // Copies the provided text to the clipboard
  async function copyTextToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      logSuccess('Question copied to clipboard');
      return {
        success: true,
        message: 'Question copied to clipboard successfully',
      };
    } catch (err) {
      logError('Failed to copy text: ' + err);
      return {
        success: false,
        error: 'Failed to copy question to clipboard',
      };
    }
  }

  // Retrieves and formats the description of the LeetCode question
  function getQuestionDescription() {
    const descriptionElement = document.querySelector(
      'div[data-track-load="description_content"]'
    );

    if (!descriptionElement) {
      logError('LeetCode question description not found');
      return '';
    }

    const htmlContent = descriptionElement.innerHTML;

    const markdownContent = htmlContent
      .replace(/<strong\b[^>]*>(.*?)<\/strong>/gi, '**$1**') // Replace <strong>content</strong> with **content**
      .replace(/<code\b[^>]*>(.*?)<\/code>/gi, '`$1`') // Replace <code>content</code> with `content`
      .replace(/<em\b[^>]*>(.*?)<\/em>/gi, (_, innerContent) => {
        // Trim inner content to remove leading and trailing spaces
        const trimmedContent = innerContent.trim();

        // Add spaces around the * for Markdown emphasis
        return ` *${trimmedContent}* `;
      });

    // Create a temporary div to parse the modified HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = markdownContent;

    // Function to recursively process nodes
    function processNode(node) {
      let formattedText = '';

      switch (node.nodeType) {
        case Node.TEXT_NODE:
          formattedText += node.textContent.trim();
          break;
        case Node.ELEMENT_NODE:
          switch (node.tagName.toLowerCase()) {
            case 'p':
              const pText = Array.from(node.childNodes)
                .map(processNode)
                .join('')
                .trim();
              if (pText.startsWith('**Example')) {
                formattedText += '\n\n' + pText + '\n'; // No extra line after example paragraphs
              } else {
                formattedText += pText + '\n\n';
              }
              break;
            case 'ul':
            case 'ol':
              const isUnorderedList = node.tagName.toLowerCase() === 'ul';
              Array.from(node.childNodes).forEach((li, index) => {
                if (
                  li.nodeType === Node.ELEMENT_NODE &&
                  li.tagName.toLowerCase() === 'li'
                ) {
                  formattedText += `${
                    isUnorderedList ? '-' : `${index + 1}.`
                  } ${processNode(li).trim()}\n`;
                }
              });
              formattedText += '\n';
              break;
            case 'img':
              const src = node.getAttribute('src');
              if (src) {
                const alt = node.getAttribute('alt') || 'Image';
                formattedText += `![${alt}](${src})\n\n`;
              }
              break;
            default:
              formattedText += Array.from(node.childNodes)
                .map(processNode)
                .join('')
                .trim();
              break;
          }
          break;
        default:
          break;
      }

      return formattedText;
    }

    const formattedText = Array.from(tempDiv.childNodes)
      .map(processNode)
      .join('')
      .replace(/\n{2,}/g, '\n \n') // Replace newlines with emspace character
      .replace(/\[\[(.*?),(.*?)\]\]/g, '`[$1, $2]`'); // Replace [[ ]] with `[[ ]]`, so that it doesn't change obsidian links.

    return formattedText.trim();
  }

  // Retrieves and formats the title of the LeetCode question
  function getQuestionTitle() {
    const titleXpath =
      '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[1]/div/div/a';
    const titleElement = document.evaluate(
      titleXpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;

    if (!titleElement) {
      logError('LeetCode question title not found');
      return '';
    }

    const formattedTitle = `[${titleElement.innerText}](${titleElement.href}) `;
    return formattedTitle;
  }

  // Combines the title and description of the LeetCode question
  function getLeetCodeQuestion() {
    const questionTitle = getQuestionTitle();
    const questionDescription = getQuestionDescription();

    if (!questionTitle || !questionDescription) {
      logError(
        'Failed to retrieve LeetCode question. Title or description is missing.'
      );
      return {
        success: false,
        error:
          'Failed to retrieve LeetCode question. Title or description is missing.',
      };
    }

    return copyTextToClipboard(questionTitle + questionDescription);
  }

  return getLeetCodeQuestion();
})();
