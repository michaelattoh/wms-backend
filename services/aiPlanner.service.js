exports.generateWeddingPlan = ({ weddingDate, guestCount, budget, preferences }) => {
    const checklist = [
      'Book venue',
      'Hire photographer',
      'Send invites',
      'Book caterer',
      'Plan entertainment',
      'Create guest list',
      'Design seating chart',
    ];
  
    const timeline = [
      { task: 'Book venue', dueBy: '6 months before' },
      { task: 'Send invites', dueBy: '3 months before' },
      { task: 'Confirm vendors', dueBy: '1 month before' },
    ];
  
    const budgetAllocation = {
      venue: budget * 0.3,
      catering: budget * 0.25,
      decoration: budget * 0.15,
      entertainment: budget * 0.1,
      photography: budget * 0.1,
      miscellaneous: budget * 0.1,
    };
  
    return {
      summary: `Plan for ${guestCount} guests with a $${budget} budget.`,
      timeline,
      checklist,
      budgetAllocation,
      vendorSuggestions: ['Venue', 'Catering', 'Decor', 'Photography'],
    };
  };
  