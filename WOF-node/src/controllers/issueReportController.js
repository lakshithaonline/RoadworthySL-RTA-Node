const issueReportService = require('../services/issueReportService');
const mongoose = require('mongoose');
const IssueReport = require("../models/IssueReport");

exports.createIssueReport = async (req, res) => {
    try {
        const { inspectionId, vehicle, examiner, description } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(inspectionId) ||
            !mongoose.Types.ObjectId.isValid(vehicle) ||
            !mongoose.Types.ObjectId.isValid(examiner)) {
            return res.status(400).json({ message: 'Invalid inspection, vehicle, or examiner ID' });
        }

        if (!description || description.trim() === '') {
            return res.status(400).json({ message: 'Description is required' });
        }

        const newReport = new IssueReport({
            userId,
            inspectionId,
            vehicle,
            examiner,
            description
        });

        await newReport.save();

        res.status(201).json({
            message: 'Issue report created successfully',
            report: newReport
        });
    } catch (error) {
        console.error('Error creating issue report:', error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.getUserIssueReports = async (req, res) => {
    try {
        const { userId } = req.params;
        const reports = await issueReportService.getUserIssueReports(userId);
        res.status(200).json(reports);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getIssueReportById = async (req, res) => {
    try {
        const { reportId } = req.params;
        const report = await issueReportService.getIssueReportById(reportId);
        if (!report) {
            return res.status(404).json({ message: 'Issue report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateIssueReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const updateData = req.body;
        const updatedReport = await issueReportService.updateIssueReport(reportId, updateData);
        if (!updatedReport) {
            return res.status(404).json({ message: 'Issue report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.resolveIssueReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { resolutionNotes } = req.body;
        const resolvedReport = await issueReportService.resolveIssueReport(reportId, resolutionNotes);
        if (!resolvedReport) {
            return res.status(404).json({ message: 'Issue report not found' });
        }
        res.status(200).json(resolvedReport);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};