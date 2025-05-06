import { useEffect } from 'react';
import { trackVisitor } from '../utils/visitorTracking';

const VisitorTracker = () => {
  useEffect(() => {
    trackVisitor();
  }, []);

  return null;
};

export default VisitorTracker; 