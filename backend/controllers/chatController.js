import { getReply } from '../services/chatService.js';

export const handleMessage = async (req, res) => {
    const { message, sessionId } = req.body; // Extract sessionId from request body

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
            error: "Message is required and must be a string." 
        });
    }

    // Determine a session identifier:
    // - Use the sessionId sent by the frontend (recommended)
    // - Fallback to the client's IP address (less reliable, but works)
    // - Final fallback to 'default'
    const userSessionId = sessionId || req.ip || 'default';

    try {
        // Pass both the message and the sessionId to the service
        const reply = await getReply(message, userSessionId);

        // Return JSON to the frontend (React)
        res.json({
            sender: "Musashi",
            text: reply,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error in handleMessage:", error);
        res.status(500).json({ 
            error: "Internal server error",
            details: error.message 
        });
    }
};