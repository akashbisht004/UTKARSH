import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Send, Download } from 'lucide-react';
import axios from 'axios';
import { BASE } from '@/url/baseurl';
import { IconButton } from '@mui/material';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Doctor = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE}/getAllReports`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        
        setReports(response.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to load reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reportId) => {
    if (!reviewText.trim()) {
      alert('Please enter a review before submitting.');
      return;
    }

    try {
      setSubmittingReview(true);
      const report = reports.find(r => r.id === reportId);
      
      if (!report) {
        throw new Error('Report not found');
      }

      const updatedReviews = [...(report.reviews || []), reviewText];

      const response = await axios.post(`${BASE}/makeChanges`, {
        id: reportId,
        email: report.email,
        image: report.image,
        reviews: updatedReviews
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data === true) {
        // Update the local state with the new review
        setReports(prevReports => 
          prevReports.map(r => 
            r.id === reportId 
              ? { ...r, reviews: updatedReviews }
              : r
          )
        );
        setReviewText('');
        setSelectedReportId(null);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDownload = (report) => {
    try {
      // Get the base64 data and detect file type
      const base64String = report.image;
      const fileType = base64String.split(';')[0].split(':')[1]; // Get the MIME type
      const base64Data = base64String.split(',')[1] || base64String;
      
      // Convert base64 to blob
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      // Create blob with the correct file type
      const blob = new Blob(byteArrays, { type: fileType });
      const url = window.URL.createObjectURL(blob);
      
      // Get file extension from MIME type
      const extension = fileType.split('/')[1];
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `medical-report-${report.id}.${extension}`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <FileText className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Medical Reports Review
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground"
          >
            Review and provide feedback on patient medical reports
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border-2 border-primary/20 shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground">Report from {report.email}</h3>
                  <p className="text-sm text-muted-foreground">ID: {report.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDownload(report)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Download Report"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <div className="w-24 h-24 bg-background/50 rounded-lg overflow-hidden">
                    <FileText className="w-full h-full text-primary/50 p-4" />
                  </div>
                </div>
              </div>

              {/* Existing Reviews */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Previous Reviews</h4>
                {report.reviews && report.reviews.length > 0 ? (
                  <div className="space-y-2">
                    {report.reviews.map((review, idx) => (
                      <div key={idx} className="bg-background/30 rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">{review}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No reviews yet</p>
                )}
              </div>

              {/* Add Review Section */}
              {selectedReportId === report.id ? (
                <div className="space-y-3">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Enter your review..."
                    className="w-full p-3 rounded-lg bg-background/50 border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setSelectedReportId(null);
                        setReviewText('');
                      }}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReviewSubmit(report.id)}
                      disabled={submittingReview}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {submittingReview ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>Submit Review</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedReportId(report.id)}
                  className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add Review
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
