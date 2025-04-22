import {School} from '../model/school.model.js';

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}


// This function creates a new school in the database
const createSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
        }
        
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            return res.status(400).json({ error: 'Invalid coordinates' });
        }

        const newSchool = new School({
            name,
            address,
            latitude,
            longitude
        });

        const savedSchool = await newSchool.save();

        res.status(201).json({
            message: 'School added successfully',
            schoolId: savedSchool._id
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// This function retrieves all schools from the database
const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
        }
        
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);
        
        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
        }
        
        if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
            return res.status(400).json({ error: 'Invalid coordinates' });
        }

        const schools = await School.find({});

        // Calculate distance for each school and sort by proximity
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                userLat, 
                userLon, 
                school.latitude, 
                school.longitude
            );
            return {
                id: school._id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                createdAt: school.createdAt,
                distance
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {createSchool,listSchools}
