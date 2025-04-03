export async function PUT(request) {
  try {
    const data = await request.json();
    console.log("📩 Request Data:", data);

    if (!data.id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(data.id) },
      data: {
        name: data.name || "",
        address: data.address || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        email: data.email || "",
        phone: data.phone || null,
        roleId: Number(data.roleId) || 0,
      },
    });

    console.log("✅ User Updated:", updatedUser);
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
