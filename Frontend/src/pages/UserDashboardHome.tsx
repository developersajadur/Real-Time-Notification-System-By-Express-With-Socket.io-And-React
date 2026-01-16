const UserDashboardHome = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
      <h2 className="text-lg font-semibold">
        Welcome to your notifications
      </h2>
      <p className="text-sm">
        Select a category from the sidebar to view notifications.
      </p>
    </div>
  );
};

export default UserDashboardHome;