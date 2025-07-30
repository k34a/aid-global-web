'use server';

import clientPromise from '@/lib/mongodb';

export async function handleFormAction(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    return { message: '❌ All fields are required.' };
  }

  try {
    const client = await clientPromise;
    const db = client.db('contactdb'); // database name
    const collection = db.collection('messages');

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return { message: '✅ Message sent and saved successfully!' };
  } catch (error) {
    console.error('DB error:', error);
    return { message: '❌ Failed to save message.' };
  }
}
