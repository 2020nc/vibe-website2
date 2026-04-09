-- Migration: Add RLS policies for all public tables
-- Date: 2026-04-09
-- Reason: Supabase security alert - tables were publicly accessible without policies

-- admin_config: only authenticated users
create policy "Authenticated can manage admin_config"
on admin_config for all
to authenticated
using (true)
with check (true);

-- admins: only authenticated users
create policy "Authenticated can manage admins"
on admins for all
to authenticated
using (true)
with check (true);

-- menu_display_settings: public can read, authenticated can manage
create policy "Public can view menu_display_settings"
on menu_display_settings for select
using (true);

create policy "Authenticated can manage menu_display_settings"
on menu_display_settings for all
to authenticated
using (true)
with check (true);

-- tenants: public can read, authenticated can manage
create policy "Public can view tenants"
on tenants for select
using (true);

create policy "Authenticated can manage tenants"
on tenants for all
to authenticated
using (true)
with check (true);

-- menu_items: add missing SELECT policy for public
create policy "Public can view menu items"
on menu_items for select
using (true);
