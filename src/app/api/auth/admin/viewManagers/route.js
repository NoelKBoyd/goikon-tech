export async function GET() {
  try {
    const managers = await prisma.user.findMany({
      where: {
        roleId: 25,
      },
      select: {  // Be explicit about fields you need
        id: true,
        firstName: true,
        lastName: true,
        email: true
      },
    });

    return NextResponse.json(managers, { status: 200 });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch managers' },
      { status: 500 }
    );
  }
}