use std::sync::{Arc, Mutex};
use std::time::Duration;
use std::thread;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum MicrophoneMode {
    AlwaysOn,
    OnDemand,
}

pub struct MockManager {
    pub mode: Arc<Mutex<MicrophoneMode>>,
}

impl MockManager {
    // This replicates the logic in src-tauri/src/managers/audio.rs
    pub fn update_mode(&self, new_mode: MicrophoneMode) {
        let mut mode_guard = self.mode.lock().unwrap();
        let cur_mode = mode_guard.clone();

        if cur_mode == new_mode {
            return;
        }

        // Simulating the match arms
        match (cur_mode, &new_mode) {
            _ => {}
        }

        // The bug was: *self.mode.lock().unwrap() = new_mode;
        // The fix is: *mode_guard = new_mode;
        *mode_guard = new_mode;
    }
}

#[test]
fn test_update_mode_no_deadlock() {
    let manager = Arc::new(MockManager {
        mode: Arc::new(Mutex::new(MicrophoneMode::OnDemand)),
    });

    let manager_clone = manager.clone();
    let _handle = thread::spawn(move || {
        manager_clone.update_mode(MicrophoneMode::AlwaysOn);
    });

    // If it deadlocks, this will hang. We use a join with timeout (simulated by sleep if join doesn't have it)
    // Actually, cargo test will eventually timeout, but we want to be proactive.

    // In a real test we'd use a channel or something, but for this reproduction:
    thread::sleep(Duration::from_millis(500));

    assert_eq!(*manager.mode.lock().unwrap(), MicrophoneMode::AlwaysOn);
}
