CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    goal_name TEXT NOT NULL,
    target_amount DECIMAL(12,
    2) NOT NULL,
    current_amount DECIMAL(12,
    2) DEFAULT 0,
    deadline DATE,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);