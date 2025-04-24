'use client';
import FieldOwnerNav from '@/app/Components/FieldOwnerNav';
import FieldOwnerSideBar from '@/app/Components/FieldOwnerSideBar';
import FieldOwnerFooter from '@/app/Components/FieldOwnerFooter';

const maintenanceData = [
    {
        fieldId: 1, // Central Park Field
        fieldName: 'Central Park Field',
        scheduleType: 'Monthly',
        scheduleDetails: 'Grass cutting, line marking, facility inspection',
        updates: 'Completed on time',
        issues: 'None'
    },
    {
        fieldId: 2,
        fieldName: 'Sunset Valley Field',
        scheduleType: 'Annual',
        scheduleDetails: 'Full facility overhaul',
        updates: 'Scheduled for next month',
        issues: 'None'
    },
    {
        fieldId: 3,
        fieldName: 'Griffith Park Stadium',
        scheduleType: 'Weekly',
        scheduleDetails: 'Grass maintenance and cleaning',
        updates: 'Ongoing',
        issues: 'Minor damage to the south goalpost'
    },
    {
        fieldId: 4,
        fieldName: 'Riverside Arena',
        scheduleType: 'Emergency',
        scheduleDetails: 'Flood damage repair',
        updates: 'In progress',
        issues: 'Field currently unusable'
    }
];

const FieldMaintenance = () => {
    return (
        <div>
            <header>
                <FieldOwnerNav />
            </header>

            <main className='grid w-full grid-cols-[260px_auto] bg-gray-100 min-h-screen'>
                <FieldOwnerSideBar className='col-start-1 col-end-2' />

                <div className='col-start-2 col-end-3 p-10'>
                    <h1 className="text-2xl font-bold mb-6 text-center">Field Maintenance</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {maintenanceData.map((entry, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                <h2 className="text-xl font-semibold mb-2">{entry.fieldName}</h2>
                                <p><span className="font-medium">Schedule Type:</span> {entry.scheduleType}</p>
                                <p><span className="font-medium">Details:</span> {entry.scheduleDetails}</p>
                                <p><span className="font-medium">Updates:</span> {entry.updates}</p>
                                <p><span className="font-medium">Issues:</span> 
                                    <span className={entry.issues.toLowerCase() === 'none' ? 'text-green-600' : 'text-red-600'}>
                                        {' '}{entry.issues}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer>
                <FieldOwnerFooter />
            </footer>
        </div>
    );
};

export default FieldMaintenance;
