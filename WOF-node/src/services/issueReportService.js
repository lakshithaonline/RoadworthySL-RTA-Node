const IssueReport = require('../models/IssueReport');


const createIssueReport = async (reportData) => {
    try {
        const newReport = new IssueReport(reportData);
        return await newReport.save();
    } catch (error) {
        throw new Error(`Error creating issue report: ${error.message}`);
    }
};


const getUserIssueReports = async (userId) => {
    try {
        return await IssueReport.find({ userId }).populate('inspectionId').populate('vehicle').populate('examiner');
    } catch (error) {
        throw new Error(`Error retrieving issue reports: ${error.message}`);
    }
};


const getIssueReportById = async (reportId) => {
    try {
        return await IssueReport.findById(reportId).populate('inspectionId').populate('vehicle').populate('examiner');
    } catch (error) {
        throw new Error(`Error retrieving issue report: ${error.message}`);
    }
};


const updateIssueReport = async (reportId, updateData) => {
    try {
        return await IssueReport.findByIdAndUpdate(reportId, updateData, { new: true });
    } catch (error) {
        throw new Error(`Error updating issue report: ${error.message}`);
    }
};


const resolveIssueReport = async (reportId, resolutionNotes) => {
    try {
        return await IssueReport.findByIdAndUpdate(reportId, { resolved: true, resolutionNotes }, { new: true });
    } catch (error) {
        throw new Error(`Error resolving issue report: ${error.message}`);
    }
};

module.exports = {
    createIssueReport,
    getUserIssueReports,
    getIssueReportById,
    updateIssueReport,
    resolveIssueReport
};
