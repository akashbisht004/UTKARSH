import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2, Edit2, X } from 'lucide-react';
import axios from 'axios';
import { BASE } from '@/url/baseurl';   

const ReportAnalysis = () => {
    
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64File, setBase64File] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [editingReport, setEditingReport] = useState(null);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetchUserReports();
  }, []);

  const fetchUserReports = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your reports');
        setLoadingReports(false);
        return;
      }

      const response = await axios.get(`${BASE}/getUserReports`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setReports(response.data);
      } else if (response.data && typeof response.data === 'object') {
        // If the response is wrapped in an object, try to find the array
        const reportsArray = Object.values(response.data).find(value => Array.isArray(value));
        setReports(reportsArray || []);
      } else {
        setReports([]);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to fetch reports. Please try again later.');
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload PDF, JPEG, or PNG files only');
        return;
      }

      setSelectedFile(file);
      setError('');
      setSuccess('');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      setLoading(true);
      const base64 = await convertToBase64(selectedFile);
      setBase64File(base64);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to upload reports');
        return;
      }

      const response = await axios.post(`${BASE}/report/save`, 
        { 
          image: base64,
          reviews: [] // Initialize with empty reviews array
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data === true) {
        setSuccess('Report uploaded successfully! It will be reviewed by our doctors soon.');
        setSelectedFile(null);
        // Refresh reports after successful upload
        fetchUserReports();
      } else {
        throw new Error('Failed to save report');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReport = async (reportId) => {
    if (!selectedFile) {
      setError('Please select a new file to update');
      return;
    }

    try {
      setLoading(true);
      const base64 = await convertToBase64(selectedFile);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to update reports');
        return;
      }

      const response = await axios.post(`${BASE}/makeChanges`, {
        id: reportId,
        email: localStorage.getItem('email'),
        image: base64,
        reviews: editingReport.reviews || []
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data === true) {
        setSuccess('Report updated successfully!');
        setSelectedFile(null);
        setEditingReport(null);
        setNewReview('');
        fetchUserReports();
      } else {
        throw new Error('Failed to update report');
      }
    } catch (err) {
      console.error('Error updating report:', err);
      setError('Error updating report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    
    setEditingReport(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview.trim()]
    }));
    setNewReview('');
  };

  const handleRemoveReview = (index) => {
    setEditingReport(prev => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index)
    }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background pt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
            Upload Medical Report
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground"
          >
            Share your medical reports for expert analysis by our doctors
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-card rounded-xl border-2 border-primary/20 shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-12 w-12 text-primary mb-4" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPEG, or PNG (MAX. 5MB)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>

              {selectedFile && (
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-foreground">{selectedFile.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 p-4 bg-green-500/10 text-green-500 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{success}</span>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!selectedFile || loading}
              className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                'Upload Report'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Reports Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-card rounded-xl border-2 border-primary/20 shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Reports</h2>
          
          {loadingReports ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-background/50 rounded-lg p-4 border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(report.id).toLocaleDateString()}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {report.email}
                      </span>
                      {!editingReport && (
                        <button
                          onClick={() => setEditingReport(report)}
                          className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-primary" />
                        </button>
                      )}
                    </div>
                  </div>

                  {editingReport && editingReport.id === report.id ? (
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">Update Report</h4>
                        <button
                          onClick={() => {
                            setEditingReport(null);
                            setSelectedFile(null);
                            setNewReview('');
                          }}
                          className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="update-file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-4">
                            <Upload className="h-8 w-8 text-primary mb-2" />
                            <p className="text-xs text-muted-foreground">
                              Click to upload new file
                            </p>
                          </div>
                          <input
                            id="update-file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>

                        {selectedFile && (
                          <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm text-foreground">{selectedFile.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">Reviews</h4>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Add a new review..."
                            className="flex-1 px-3 py-2 bg-background/50 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            onClick={handleAddReview}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        {editingReport.reviews && editingReport.reviews.length > 0 && (
                          <ul className="space-y-1">
                            {editingReport.reviews.map((review, index) => (
                              <li key={index} className="flex items-center justify-between text-sm bg-background/50 p-2 rounded-lg">
                                <span className="text-muted-foreground">{review}</span>
                                <button
                                  onClick={() => handleRemoveReview(index)}
                                  className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                                >
                                  <X className="h-3 w-3 text-destructive" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <button
                        onClick={() => handleUpdateReport(report.id)}
                        disabled={!selectedFile || loading}
                        className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          'Update Report'
                        )}
                      </button>
                    </div>
                  ) : (
                    report.reviews && Array.isArray(report.reviews) && report.reviews.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-foreground mb-2">Doctor's Reviews:</h4>
                        <ul className="space-y-1">
                          {report.reviews.map((review, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {review}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No reports found. Upload your first report above.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
