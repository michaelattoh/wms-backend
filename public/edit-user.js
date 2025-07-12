// edit-user.js
const userId = new URLSearchParams(window.location.search).get('id');
const form = document.getElementById('editUserForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const roleInput = document.getElementById('role');

// Fetch and fill user data
async function fetchUser() {
  try {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to fetch user');

    nameInput.value = data.name || '';
    emailInput.value = data.email || '';
    phoneInput.value = data.phone || '';
    roleInput.value = data.role || '';
  } catch (err) {
    console.error(err);
    alert('Failed to load user data');
  }
}

// Submit update
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`https://2d39fd105bf1.ngrok-free.app/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        role: roleInput.value
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user');

    alert('User updated successfully');
    window.location.href = '/users.html'; // adjust to your actual users list page
  } catch (err) {
    console.error(err);
    alert('Failed to update user');
  }
});

fetchUser();
