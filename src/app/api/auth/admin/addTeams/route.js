export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate input
    const requiredFields = ['name', 'managerId', 'location', 'ageGroup', 'contactInfo'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          missingFields 
        }), 
        { status: 400 }
      );
    }

    // Create team
    const newTeam = await prisma.team.create({
      data: {
        name: data.name,
        managerId: parseInt(data.managerId, 10),
        location: data.location,
        ageGroup: data.ageGroup,
        contactInfo: data.contactInfo,
      },
    });

    return new Response(JSON.stringify(newTeam), { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }), 
      { status: 500 }
    );
  }
}