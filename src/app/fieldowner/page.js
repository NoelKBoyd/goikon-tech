import React from 'react';
import FieldOwnerNav from '../Components/FieldOwnerNav';
import FieldOwnerSideBar from '../Components/FieldOwnerSideBar';
import FieldOwnerFooter from '../Components/FieldOwnerFooter';
import Calendar from '../Components/Calendar';

const maintenanceData = [
    {
        fieldId: 1,
        fieldName: 'Central Park Field',
        scheduleType: 'Monthly',
        scheduleDetails: 'Grass cutting, line marking, facility inspection',
        updates: 'Completed on time',
        issues: 'None'
    },
    {
        fieldId: 1,
        fieldName: 'Central Park Field',
        scheduleType: 'Annual',
        scheduleDetails: 'Full facility overhaul',
        updates: 'Scheduled for next month',
        issues: 'None'
    },
    {
        fieldId: 2,
        fieldName: 'Griffith Park Stadium',
        scheduleType: 'Weekly',
        scheduleDetails: 'Grass maintenance and cleaning',
        updates: 'Ongoing',
        issues: 'Minor damage to the south goalpost'
    },
    {
        fieldId: 3,
        fieldName: 'Riverside Arena',
        scheduleType: 'Emergency',
        scheduleDetails: 'Flood damage repair',
        updates: 'In progress',
        issues: 'Field currently unusable'
    }
];

const bookingRequests = [
    {
        teamId: 1,
        teamName: 'Team Alpha',
        matchId: 1,
        fieldId: 1,
        fieldName: 'Central Park Field',
        timing: new Date('2023-09-02T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 2,
        teamName: 'Team Beta',
        matchId: 1,
        fieldId: 1,
        fieldName: 'Central Park Field',
        timing: new Date('2023-09-02T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 3,
        teamName: 'Team Gamma',
        matchId: 2,
        fieldId: 2,
        fieldName: 'Griffith Park Stadium',
        timing: new Date('2023-09-03T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 4,
        teamName: 'Team Delta',
        matchId: 2,
        fieldId: 2,
        fieldName: 'Griffith Park Stadium',
        timing: new Date('2023-09-03T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 1,
        teamName: 'Team Alpha',
        matchId: 4,
        fieldId: 4,
        fieldName: 'Sunset Valley Field',
        timing: new Date('2023-09-10T13:00:00Z'),
        acceptReject: 'Pending',
        status: 'Requested'
    },
    {
        teamId: 2,
        teamName: 'Team Beta',
        matchId: 3,
        fieldId: 1,
        fieldName: 'Central Park Field',
        timing: new Date('2023-09-09T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    },
    {
        teamId: 5,
        teamName: 'Team Epsilon',
        matchId: 3,
        fieldId: 1,
        fieldName: 'Central Park Field',
        timing: new Date('2023-09-09T13:00:00Z'),
        acceptReject: 'Accepted',
        status: 'Confirmed'
    }
];

const FieldOwnerPage = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav/>
            </header>

            <main className='grid w-full grid-cols-[250px_auto] bg-gray-100 h-screen'>
                <div className='col-start-1 col-end-2'>
                    <FieldOwnerSideBar/>
                </div>

                <div className='col-start-2 col-end-3 pt-10 px-6 overflow-auto'>
                    <div className="grid grid-cols-2 gap-6">
                        
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <Calendar/>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-[350px] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">Maintenance Status</h2>
                            <div className="space-y-4">
                                {maintenanceData.map((item, index) => (
                                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <p className="font-semibold">Field: {item.fieldName} (ID: {item.fieldId})</p>
                                        <p>Schedule Type: {item.scheduleType}</p>
                                        <p>Schedule Details: {item.scheduleDetails}</p>
                                        <p className="text-red-500">Issues: {item.issues}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 w-full h-[500px] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Field Booking Requests</h2>
                        <div className="space-y-4">
                            {bookingRequests.map((request, index) => (
                                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <p className="font-semibold">Team: {request.teamName} (ID: {request.teamId})</p>
                                    <p>Field: {request.fieldName} (ID: {request.fieldId})</p>
                                    <p>Match Timing: {request.timing.toLocaleString()}</p>
                                    <p>Status: {request.status}</p>
                                    <p className={`font-semibold ${request.acceptReject === 'Accepted' ? 'text-green-500' : 'text-yellow-500'}`}>
                                        {request.acceptReject}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            <footer>
                <FieldOwnerFooter/>
            </footer>
        </div>
    );
};

export default FieldOwnerPage;
