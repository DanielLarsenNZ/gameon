import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Copies the given string to the clipboard.
 * @param {Number} resetInterval milliseconds before user is able to copy again
 */
const useCopyToClipboard = (resetInterval = 2000) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text, notify = true) => {
    if (typeof text === 'string' || typeof text == 'number') {
      navigator.clipboard.writeText(text.toString());
      setCopied(true);
      notify && toast.success('Copied to Clipboard!');
    } else {
      setCopied(false);
      notify && toast.error('Unable to Copy to Clipboard!');
    }
  }, []);

  useEffect(() => {
    let timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return { isCopied, handleCopy };
};

export default useCopyToClipboard;
