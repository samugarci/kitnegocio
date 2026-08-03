import {
  clearLocalActivities,
  recordLocalActivity,
  type ActivityType,
} from '@/lib/auth-store';
import { createSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function recordActivity(
  userId: string,
  type: ActivityType,
  detail: string
): Promise<void> {
  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdmin();
    if (admin) {
      const { error } = await admin.from('activity_logs').insert({
        user_id: userId,
        event_type: type,
        detail,
      });
      if (!error) return;
    }
  }

  await recordLocalActivity(userId, type, detail);
}

/** Clears activity history only — never users, purchases or product files */
export async function clearActivityHistory(): Promise<number> {
  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdmin();
    if (admin) {
      const { data, error } = await admin.from('activity_logs').select('id');
      if (error) throw new Error(error.message);
      const count = data?.length || 0;
      if (count > 0) {
        const { error: deleteError } = await admin
          .from('activity_logs')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
        if (deleteError) throw new Error(deleteError.message);
      }
      return count;
    }
  }

  return clearLocalActivities();
}
